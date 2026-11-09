// AddCategoryPage.tsx
import {
  useCallback,
  useEffect,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import type { Category } from "@/types/category";
import ConfirmDialog from "@/ui/ConfirmDialog";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import CategoryTable from "./CategoryTable";

type DeleteAction = "delete" | "restore" | "hardDelete";

interface ConfirmState {
  open: boolean;
  id: string | null;
  action: DeleteAction;
}

/* Local sub field state used by the form */
type SubField = {
  name: string;
  file?: File | null;
  preview?: string | null; // client-side object URL preview
  existingImage?: string | null; // server URL if editing
  _id?: string | null; // server _id for existing subcategories
};

export default function AddCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainName, setMainName] = useState<string>("");
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<SubField[]>([
    { name: "", file: null, preview: null },
  ]);
  const [editingMainId, setEditingMainId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const [confirmState, setConfirmState] = useState<ConfirmState>({
    open: false,
    id: null,
    action: "delete",
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const API_BASE = `${import.meta.env.VITE_API_URL}/v1/categories`;

  const showToast = useCallback(
    (type: "success" | "error", message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 4000);
    },
    [],
  );

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axios.get<{
        success: boolean;
        categories: Category[];
      }>(`${API_BASE}?admin=true`, { withCredentials: true });
      if (data.success) startTransition(() => setCategories(data.categories));
    } catch {
      showToast("error", "Failed to load categories");
    }
  }, [API_BASE, showToast]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addSubcategoryField = () =>
    setSubcategories((prev) => [
      ...prev,
      { name: "", file: null, preview: null },
    ]);

  const removeSubcategoryField = (i: number) =>
    setSubcategories((prev) => {
      const toRevoke = prev[i]?.preview;
      if (toRevoke) URL.revokeObjectURL(toRevoke);
      return prev.filter((_, idx) => idx !== i);
    });

  const updateSubcategory = (i: number, value: string) => {
    const filtered = value.replace(/[^a-zA-Z\s]/g, "");
    setSubcategories((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], name: filtered };
      return next;
    });
  };

  const updateSubcategoryFile = (i: number, file?: File | null) => {
    setSubcategories((prev) => {
      const next = [...prev];
      if (next[i]?.preview) {
        URL.revokeObjectURL(next[i]!.preview!);
      }
      if (file) {
        next[i] = { ...next[i], file, preview: URL.createObjectURL(file) };
      } else {
        next[i] = { ...next[i], file: null, preview: null };
      }
      return next;
    });
  };

  const handleMainNameChange = (value: string) => {
    const filtered = value.replace(/[^a-zA-Z\s]/g, "");
    setMainName(filtered);
  };

  const handleMainImageChange = (file?: File | null) => {
    if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
    if (file) {
      setMainImageFile(file);
      setMainImagePreview(URL.createObjectURL(file));
    } else {
      setMainImageFile(null);
      setMainImagePreview(null);
    }
  };

  // used and wired to CategoryForm prop
  const removeSubExistingImage = (index: number) => {
    setSubcategories((prev) => {
      const next = [...prev];
      if (next[index]?.preview) URL.revokeObjectURL(next[index]!.preview!);
      next[index] = {
        ...next[index],
        file: null,
        preview: null,
        existingImage: null,
      };
      return next;
    });
  };

  const onRemoveMainImage = () => {
    if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
    setMainImageFile(null);
    setMainImagePreview(null);
  };

  const resetForm = useCallback(() => {
    setMainName("");
    if (mainImagePreview) URL.revokeObjectURL(mainImagePreview);
    setMainImagePreview(null);
    setMainImageFile(null);
    subcategories.forEach((s) => {
      if (s.preview) URL.revokeObjectURL(s.preview);
    });
    setSubcategories([{ name: "", file: null, preview: null }]);
    setEditingMainId(null);
  }, [mainImagePreview, subcategories]);

  const handleEdit = useCallback(
    (category: Category) => {
      startTransition(() => {
        const mainCat = category.isSub
          ? categories.find((c) => c._id === category.parent)
          : category;
        if (!mainCat) return;

        setMainName(mainCat.name);
        setEditingMainId(mainCat._id);

        const subs = (mainCat.subcategories || []).map((sub) => ({
          name: sub.name,
          file: null,
          preview: null,
          existingImage: sub.image ?? null,
          _id: sub._id,
        }));
        setSubcategories(
          subs.length > 0 ? subs : [{ name: "", file: null, preview: null }],
        );

        setMainImageFile(null);
        setMainImagePreview(mainCat.image ?? null);

        setExpanded((prev) => new Set(prev).add(mainCat._id));
      });
    },
    [categories],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedMain = mainName.trim();
    if (!trimmedMain)
      return showToast("error", "Main category name is required");
    if (!/^[a-zA-Z\s]+$/.test(trimmedMain))
      return showToast(
        "error",
        "Main category can only contain letters and spaces",
      );

    const subObjects = subcategories.map((s) => ({
      ...s,
      name: (s.name || "").trim(),
    }));
    const trimmedSubs = subObjects.map((s) => s.name).filter(Boolean);

    for (const subName of trimmedSubs) {
      if (!/^[a-zA-Z\s]+$/.test(subName))
        return showToast("error", `"${subName}" contains invalid characters`);
    }

    const duplicateMain = categories.find(
      (c) =>
        c.name.toLowerCase() === trimmedMain.toLowerCase() &&
        !c.isSub &&
        c._id !== editingMainId,
    );
    if (duplicateMain)
      return showToast("error", `Category "${trimmedMain}" already exists`);

    setSaving(true);
    try {
      let mainCategoryId: string;

      // Build FormData for main category (multipart even for PUT so image handling is uniform)
      const fd = new FormData();
      fd.append("name", trimmedMain);
      fd.append("isSub", "false");

      if (editingMainId) {
        const originalMain = categories.find((c) => c._id === editingMainId);
        const originalImageExists = Boolean(originalMain?.image);
        const userRemovedMainImage =
          !mainImageFile && mainImagePreview === null && originalImageExists;
        if (userRemovedMainImage) fd.append("imageRemoved", "true");
      }

      if (mainImageFile) fd.append("image", mainImageFile);

      if (editingMainId) {
        await axios.put(`${API_BASE}/${editingMainId}`, fd, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        mainCategoryId = editingMainId;
      } else {
        const res = await axios.post<{ category: Category }>(API_BASE, fd, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
        mainCategoryId = res.data.category._id;
      }

      // === handle subs robustly by _id ===
      const currentMain = categories.find((c) => c._id === mainCategoryId);
      const existingSubs = (currentMain?.subcategories || []).filter(
        (s) => !s.isDeleted,
      );

      // map existing by id
      const existingById = new Map<string, { name: string }>();
      existingSubs.forEach((s) => existingById.set(s._id, { name: s.name }));

      // form sub ids (only those with _id)
      const formSubIds = new Set<string>();
      for (const s of subObjects) {
        if (s._id) formSubIds.add(s._id);
      }

      // delete those existing ids that are not present in the form
      const toDeleteIds = existingSubs
        .filter((s) => !formSubIds.has(s._id))
        .map((s) => s._id);

      const upsertPromises: Promise<unknown>[] = [];

      // update existing subcategory via PUT
      const updateSubcategory = async (sub: SubField) => {
        if (!sub._id) return null;
        const original = existingById.get(sub._id);
        const nameChanged = original
          ? original.name.toLowerCase() !== (sub.name || "").toLowerCase()
          : Boolean(sub.name);
        const fileProvided = Boolean(sub.file);
        const imageRemoved = sub.existingImage === null && !sub.file;

        if (!nameChanged && !fileProvided && !imageRemoved) return null;

        const sfd = new FormData();
        if (sub.name) sfd.append("name", sub.name);
        sfd.append("isSub", "true");
        sfd.append("parent", mainCategoryId);

        if (fileProvided) sfd.append("image", sub.file as Blob);
        else if (imageRemoved) sfd.append("imageRemoved", "true");

        return axios.put(`${API_BASE}/${sub._id}`, sfd, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });
      };

      // create new subcategory via POST
      const createSubcategory = async (sub: SubField) => {
        const sfd = new FormData();
        sfd.append("name", sub.name);
        sfd.append("isSub", "true");
        sfd.append("parent", mainCategoryId);
        if (sub.file) sfd.append("image", sub.file as Blob);
        return axios.post(API_BASE, sfd, { withCredentials: true });
      };

      for (const s of subObjects) {
        if (!s.name) continue;
        if (s._id) {
          upsertPromises.push(updateSubcategory(s));
        } else {
          upsertPromises.push(createSubcategory(s));
        }
      }

      const deletePromises = toDeleteIds.map((id) =>
        axios.delete(`${API_BASE}/${id}`, { withCredentials: true }),
      );

      await Promise.all([...upsertPromises, ...deletePromises]);

      showToast(
        "success",
        editingMainId ? "Updated successfully!" : "Created successfully!",
      );
      resetForm();
      fetchCategories();
    } catch (err) {
      const response = (err as { response?: { data?: { message?: string } } })
        .response;
      const message =
        response?.data?.message ?? "Operation failed. Please try again.";
      showToast("error", message);
    } finally {
      setSaving(false);
    }
  };

  const openConfirm = (id: string, action: DeleteAction) => {
    setConfirmState({ open: true, id, action });
  };

  const confirmAction = async () => {
    if (!confirmState.id) return;
    setDeletingId(confirmState.id);
    try {
      if (confirmState.action === "delete")
        await axios.delete(`${API_BASE}/${confirmState.id}`, {
          withCredentials: true,
        });
      if (confirmState.action === "restore")
        await axios.patch(`${API_BASE}/${confirmState.id}/restore`, null, {
          withCredentials: true,
        });
      if (confirmState.action === "hardDelete")
        await axios.delete(`${API_BASE}/${confirmState.id}/force`, {
          withCredentials: true,
        });

      showToast("success", "Action completed successfully");
      fetchCategories();
    } catch {
      showToast("error", "Action failed");
    } finally {
      setDeletingId(null);
      setConfirmState({ open: false, id: null, action: "delete" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Category Management
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4 lg:gap-6 items-start">
          <CategoryForm
            mainName={mainName}
            mainImagePreview={mainImagePreview}
            mainExistingImage={mainImagePreview}
            editingMainId={editingMainId}
            subcategories={subcategories}
            saving={saving}
            isPending={isPending}
            onMainNameChange={handleMainNameChange}
            onMainImageChange={handleMainImageChange}
            onRemoveMainImage={onRemoveMainImage}
            onAddSubcategory={addSubcategoryField}
            onRemoveSubcategory={removeSubcategoryField}
            onUpdateSubcategory={updateSubcategory}
            onUpdateSubcategoryFile={updateSubcategoryFile}
            onRemoveSubcategoryImage={removeSubExistingImage} // wired and used in CategoryForm
            onSubmit={handleSubmit}
            onCancelEdit={resetForm}
          />

          <CategoryTable
            categories={categories}
            expanded={expanded}
            deletingId={deletingId}
            isPending={isPending}
            onToggleExpand={toggleExpand}
            onEditMain={handleEdit}
            onOpenConfirm={openConfirm}
          />
        </div>

        <ConfirmDialog
          open={confirmState.open}
          title={
            confirmState.action === "restore"
              ? "Restore Item?"
              : confirmState.action === "hardDelete"
                ? "Permanently Delete?"
                : "Soft Delete?"
          }
          description={
            confirmState.action === "hardDelete"
              ? "This will permanently remove the item and cannot be undone."
              : confirmState.action === "restore"
                ? "This will restore the item."
                : "This will hide the item (soft delete)."
          }
          confirmText={
            confirmState.action === "restore"
              ? "Restore"
              : confirmState.action === "hardDelete"
                ? "Delete Forever"
                : "Delete"
          }
          variant={confirmState.action === "restore" ? "success" : "danger"}
          onConfirm={confirmAction}
          onCancel={() =>
            setConfirmState({ open: false, id: null, action: "delete" })
          }
        />

        {toast && (
          <div
            className={`fixed bottom-6 right-4 sm:right-8 px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl shadow-2xl text-white text-sm sm:text-base font-semibold z-50 transition-all ${
              toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        )}
      </div>
    </div>
  );
}
