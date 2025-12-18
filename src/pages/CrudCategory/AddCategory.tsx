// // // AddCategory.tsx - LIGHTNING FAST + PROFESSIONAL
// // AddCategoryPage.tsx
// import {
//   useEffect,
//   useState,
//   useTransition,
//   useCallback,
//   type FormEvent,
// } from "react";
// import axios from "axios";
// import type { Category } from "@/types/category";
// import ConfirmDialog from "@/ui/ConfirmDialog";
// import CategoryForm from "./CategoryForm";
// import CategoryTable from "./CategoryTable";

// type DeleteAction = "delete" | "restore" | "hardDelete";

// interface ConfirmState {
//   open: boolean;
//   id: string | null;
//   action: DeleteAction;
// }

// export default function AddCategoryPage() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [mainName, setMainName] = useState("");
//   const [subcategories, setSubcategories] = useState<string[]>([""]);
//   const [editingMainId, setEditingMainId] = useState<string | null>(null);
//   const [expanded, setExpanded] = useState<Set<string>>(new Set());

//   const [confirmState, setConfirmState] = useState<ConfirmState>({
//     open: false,
//     id: null,
//     action: "delete",
//   });

//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [toast, setToast] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);
//   const [isPending, startTransition] = useTransition();

//   const API_BASE = `${import.meta.env.VITE_API_URL}/v1/categories`;

//   const showToast = useCallback(
//     (type: "success" | "error", message: string) => {
//       setToast({ type, message });
//       setTimeout(() => setToast(null), 4000);
//     },
//     []
//   );

//   const fetchCategories = useCallback(async () => {
//     try {
//       const { data } = await axios.get<{
//         success: boolean;
//         categories: Category[];
//       }>(`${API_BASE}?admin=true`, { withCredentials: true });

//       if (data.success) {
//         startTransition(() => setCategories(data.categories));
//       }
//     } catch {
//       showToast("error", "Failed to load categories");
//     }
//   }, [API_BASE, showToast]);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const toggleExpand = (id: string) => {
//     setExpanded((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) next.delete(id);
//       else next.add(id);
//       return next;
//     });
//   };

//   const addSubcategoryField = () => setSubcategories((prev) => [...prev, ""]);

//   const removeSubcategoryField = (i: number) =>
//     setSubcategories((prev) => prev.filter((_, idx) => idx !== i));

//   const updateSubcategory = (i: number, value: string) => {
//     const filtered = value.replace(/[^a-zA-Z\s]/g, "");
//     setSubcategories((prev) => {
//       const next = [...prev];
//       next[i] = filtered;
//       return next;
//     });
//   };

//   const handleMainNameChange = (value: string) => {
//     const filtered = value.replace(/[^a-zA-Z\s]/g, "");
//     setMainName(filtered);
//   };

//   const resetForm = useCallback(() => {
//     setMainName("");
//     setSubcategories([""]);
//     setEditingMainId(null);
//   }, []);

//   const handleEdit = useCallback(
//     (category: Category) => {
//       startTransition(() => {
//         const mainCat = category.isSub
//           ? categories.find((c) => c._id === category.parent)
//           : category;

//         if (!mainCat) return;

//         setMainName(mainCat.name);
//         setEditingMainId(mainCat._id);

//         const subs = mainCat.subcategories?.map((sub) => sub.name).sort() ?? [];
//         setSubcategories(subs.length > 0 ? subs : [""]);
//         setExpanded((prev) => new Set(prev).add(mainCat._id));
//       });
//     },
//     [categories]
//   );

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     const trimmedMain = mainName.trim();
//     if (!trimmedMain)
//       return showToast("error", "Main category name is required");
//     if (!/^[a-zA-Z\s]+$/.test(trimmedMain))
//       return showToast(
//         "error",
//         "Main category can only contain letters and spaces"
//       );

//     const trimmedSubs = subcategories.map((s) => s.trim()).filter(Boolean);
//     for (const sub of trimmedSubs) {
//       if (!/^[a-zA-Z\s]+$/.test(sub)) {
//         return showToast("error", `"${sub}" contains invalid characters`);
//       }
//     }

//     const duplicateMain = categories.find(
//       (c) =>
//         c.name.toLowerCase() === trimmedMain.toLowerCase() &&
//         !c.isSub &&
//         c._id !== editingMainId
//     );
//     if (duplicateMain)
//       return showToast("error", `Category "${trimmedMain}" already exists`);

//     setSaving(true);
//     try {
//       let mainCategoryId: string;

//       if (editingMainId) {
//         await axios.put(
//           `${API_BASE}/${editingMainId}`,
//           { name: trimmedMain },
//           { withCredentials: true }
//         );
//         mainCategoryId = editingMainId;
//       } else {
//         const res = await axios.post<{ category: Category }>(
//           API_BASE,
//           { name: trimmedMain, isSub: false },
//           { withCredentials: true }
//         );
//         mainCategoryId = res.data.category._id;
//       }

//       const currentMain = categories.find((c) => c._id === mainCategoryId);
//       const existingSubs = (currentMain?.subcategories || []).filter(
//         (s) => !s.isDeleted
//       );

//       const existingNames = new Set(
//         existingSubs.map((s) => s.name.toLowerCase())
//       );
//       const newNames = new Set(trimmedSubs.map((s) => s.toLowerCase()));

//       const createPromises = trimmedSubs
//         .filter((name) => !existingNames.has(name.toLowerCase()))
//         .map((name) =>
//           axios.post(
//             API_BASE,
//             { name, isSub: true, parent: mainCategoryId },
//             { withCredentials: true }
//           )
//         );

//       const deletePromises = existingSubs
//         .filter((sub) => !newNames.has(sub.name.toLowerCase()))
//         .map((sub) =>
//           axios.delete(`${API_BASE}/${sub._id}`, { withCredentials: true })
//         );

//       await Promise.all([...createPromises, ...deletePromises]);

//       showToast(
//         "success",
//         editingMainId ? "Updated successfully!" : "Created successfully!"
//       );
//       resetForm();
//       fetchCategories();
//     } catch (error) {
//       const err = error as { response?: { data?: { message?: string } } };
//       const message =
//         err.response?.data?.message || "Operation failed. Please try again.";
//       showToast("error", message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const openConfirm = (id: string, action: DeleteAction) => {
//     setConfirmState({ open: true, id, action });
//   };

//   const confirmAction = async () => {
//     if (!confirmState.id) return;
//     setDeletingId(confirmState.id);
//     try {
//       if (confirmState.action === "delete")
//         await axios.delete(`${API_BASE}/${confirmState.id}`, {
//           withCredentials: true,
//         });
//       if (confirmState.action === "restore")
//         await axios.patch(`${API_BASE}/${confirmState.id}/restore`, null, {
//           withCredentials: true,
//         });
//       if (confirmState.action === "hardDelete")
//         await axios.delete(`${API_BASE}/${confirmState.id}/force`, {
//           withCredentials: true,
//         });

//       showToast("success", "Action completed successfully");
//       fetchCategories();
//     } catch {
//       showToast("error", "Action failed");
//     } finally {
//       setDeletingId(null);
//       setConfirmState({ open: false, id: null, action: "delete" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-3 sm:px-4 lg:px-8">
//       <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Category Management
//           </h1>
//         </div>

//         {/* Form + table layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-4 lg:gap-6 items-start">
//           <CategoryForm
//             mainName={mainName}
//             subcategories={subcategories}
//             editingMainId={editingMainId}
//             saving={saving}
//             isPending={isPending}
//             onMainNameChange={handleMainNameChange}
//             onAddSubcategory={addSubcategoryField}
//             onRemoveSubcategory={removeSubcategoryField}
//             onUpdateSubcategory={updateSubcategory}
//             onSubmit={handleSubmit}
//             onCancelEdit={resetForm}
//           />

//           <CategoryTable
//             categories={categories}
//             expanded={expanded}
//             deletingId={deletingId}
//             isPending={isPending}
//             onToggleExpand={toggleExpand}
//             onEditMain={handleEdit}
//             onOpenConfirm={openConfirm}
//           />
//         </div>

//         <ConfirmDialog
//           open={confirmState.open}
//           title={
//             confirmState.action === "restore"
//               ? "Restore Item?"
//               : confirmState.action === "hardDelete"
//               ? "Permanently Delete?"
//               : "Soft Delete?"
//           }
//           description={
//             confirmState.action === "hardDelete"
//               ? "This will permanently remove the item and cannot be undone."
//               : confirmState.action === "restore"
//               ? "This will restore the item."
//               : "This will hide the item (soft delete)."
//           }
//           confirmText={
//             confirmState.action === "restore"
//               ? "Restore"
//               : confirmState.action === "hardDelete"
//               ? "Delete Forever"
//               : "Delete"
//           }
//           variant={confirmState.action === "restore" ? "success" : "danger"}
//           onConfirm={confirmAction}
//           onCancel={() =>
//             setConfirmState({ open: false, id: null, action: "delete" })
//           }
//         />

//         {toast && (
//           <div
//             className={`fixed bottom-6 right-4 sm:right-8 px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl shadow-2xl text-white text-sm sm:text-base font-semibold z-50 transition-all ${
//               toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
//             }`}
//           >
//             {toast.message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
////////////////////////////////////////// new update with image
// AddCategoryPage.tsx
import {
  useCallback,
  useEffect,
  useState,
  useTransition,
  type FormEvent,
} from "react";
import axios from "axios";
import type { Category } from "@/types/category";
import ConfirmDialog from "@/ui/ConfirmDialog";
import CategoryForm from "./CategoryForm";
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
    []
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
          subs.length > 0 ? subs : [{ name: "", file: null, preview: null }]
        );

        setMainImageFile(null);
        setMainImagePreview(mainCat.image ?? null);

        setExpanded((prev) => new Set(prev).add(mainCat._id));
      });
    },
    [categories]
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedMain = mainName.trim();
    if (!trimmedMain)
      return showToast("error", "Main category name is required");
    if (!/^[a-zA-Z\s]+$/.test(trimmedMain))
      return showToast(
        "error",
        "Main category can only contain letters and spaces"
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
        c._id !== editingMainId
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
        (s) => !s.isDeleted
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
        axios.delete(`${API_BASE}/${id}`, { withCredentials: true })
      );

      await Promise.all([...upsertPromises, ...deletePromises]);

      showToast(
        "success",
        editingMainId ? "Updated successfully!" : "Created successfully!"
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

// import React, {
//   useEffect,
//   useState,
//   useTransition,
//   memo,
//   useCallback,
// } from "react";
// import axios from "axios";
// import type { Category } from "@/types/category";
// import CategoryTable from "./CategoryTable";
// import ConfirmDialog from "@/ui/ConfirmDialog";
// import { Plus, X, Save, Edit2, Loader2 } from "lucide-react";

// const AddCategory = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [mainName, setMainName] = useState("");
//   const [subcategories, setSubcategories] = useState<string[]>([""]);
//   const [editingMainId, setEditingMainId] = useState<string | null>(null);

//   const [confirmState, setConfirmState] = useState<{
//     open: boolean;
//     id: string | null;
//     action: "delete" | "restore" | "hardDelete";
//   }>({ open: false, id: null, action: "delete" });

//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [toast, setToast] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);

//   const [isPending, startTransition] = useTransition();

//   const API_BASE = `${import.meta.env.VITE_API_URL}/v1/categories`;

//   const showToast = useCallback(
//     (type: "success" | "error", message: string) => {
//       setToast({ type, message });
//       setTimeout(() => setToast(null), 4000);
//     },
//     []
//   );

//   const fetchCategories = useCallback(async () => {
//     try {
//       const { data } = await axios.get<{
//         success: boolean;
//         categories: Category[];
//       }>(`${API_BASE}?admin=true`, { withCredentials: true });
//       if (data.success) {
//         startTransition(() => {
//           setCategories(data.categories);
//         });
//       }
//     } catch {
//       showToast("error", "Failed to load categories");
//     }
//   }, [API_BASE, showToast]);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // Optimized handlers
//   const addSubcategoryField = () => setSubcategories((prev) => [...prev, ""]);
//   const removeSubcategoryField = (index: number) =>
//     setSubcategories((prev) => prev.filter((_, i) => i !== index));
//   const updateSubcategory = (index: number, value: string) => {
//     setSubcategories((prev) => {
//       const next = [...prev];
//       next[index] = value;
//       return next;
//     });
//   };

//   const resetForm = useCallback(() => {
//     setMainName("");
//     setSubcategories([""]);
//     setEditingMainId(null);
//   }, []);

//   const handleEdit = useCallback(
//     (category: Category) => {
//       startTransition(() => {
//         const mainCat = category.isSub
//           ? categories.find((c) => c._id === category.parent)
//           : category;

//         if (!mainCat) return;

//         setMainName(mainCat.name);
//         setEditingMainId(mainCat._id);

//         const subs = categories
//           .filter((c) => c.parent === mainCat._id && !c.isDeleted)
//           .map((c) => c.name)
//           .sort();

//         setSubcategories(subs.length > 0 ? subs : [""]);
//       });
//     },
//     [categories]
//   );

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const trimmedMain = mainName.trim();
//     if (!trimmedMain)
//       return showToast("error", "Main category name is required");

//     const trimmedSubs = subcategories.map((s) => s.trim()).filter(Boolean);

//     const existingMain = categories.find(
//       (c) =>
//         c.name.toLowerCase() === trimmedMain.toLowerCase() &&
//         !c.isSub &&
//         c._id !== editingMainId
//     );
//     if (existingMain)
//       return showToast(
//         "error",
//         `Main category "${trimmedMain}" already exists`
//       );

//     setSaving(true);
//     try {
//       let mainCategoryId: string;

//       if (editingMainId) {
//         await axios.put(
//           `${API_BASE}/${editingMainId}`,
//           { name: trimmedMain, isSub: false, parent: null },
//           { withCredentials: true }
//         );
//         mainCategoryId = editingMainId;
//       } else {
//         const res = await axios.post<{ category: Category }>(
//           API_BASE,
//           { name: trimmedMain, isSub: false, parent: null },
//           { withCredentials: true }
//         );
//         mainCategoryId = res.data.category._id;
//       }

//       if (trimmedSubs.length > 0) {
//         const currentSubs = categories.filter(
//           (c) => c.parent === mainCategoryId
//         );
//         for (const sub of trimmedSubs) {
//           if (
//             !currentSubs.some((c) => c.name.toLowerCase() === sub.toLowerCase())
//           ) {
//             await axios.post(
//               API_BASE,
//               { name: sub, isSub: true, parent: mainCategoryId },
//               { withCredentials: true }
//             );
//           }
//         }
//       }

//       showToast("success", "Category group saved successfully");
//       resetForm();
//       fetchCategories();
//     } catch (err: any) {
//       showToast("error", err.response?.data?.message || "Save failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const openConfirm = useCallback(
//     (id: string, action: "delete" | "restore" | "hardDelete") => {
//       setConfirmState({ open: true, id, action });
//     },
//     []
//   );

//   const confirmAction = async () => {
//     if (!confirmState.id) return;
//     setDeletingId(confirmState.id);
//     try {
//       const { id, action } = confirmState;
//       if (action === "delete")
//         await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
//       if (action === "restore")
//         await axios.patch(`${API_BASE}/${id}/restore`, null, {
//           withCredentials: true,
//         });
//       if (action === "hardDelete")
//         await axios.delete(`${API_BASE}/${id}/force`, {
//           withCredentials: true,
//         });
//       showToast("success", "Action completed");
//       fetchCategories();
//     } catch {
//       showToast("error", "Action failed");
//     } finally {
//       setDeletingId(null);
//       setConfirmState({ open: false, id: null, action: "delete" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-8">
//           Category Management
//         </h1>

//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-10">
//           <div className="flex items-center gap-3 mb-8">
//             {editingMainId ? (
//               <Edit2 className="w-7 h-7 text-indigo-600" />
//             ) : (
//               <Plus className="w-7 h-7 text-green-600" />
//             )}
//             <h2 className="text-2xl font-bold text-gray-800">
//               {editingMainId
//                 ? "Edit Category Group"
//                 : "Create New Category Group"}
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Main Category */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 Main Category <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={mainName}
//                 onChange={(e) => setMainName(e.target.value)}
//                 placeholder="e.g., Electronics"
//                 className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//                 disabled={saving}
//               />
//             </div>

//             {/* Subcategories */}
//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <label className="text-sm font-semibold text-gray-700">
//                   Subcategories{" "}
//                   <span className="text-gray-500 font-normal">(optional)</span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={addSubcategoryField}
//                   className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
//                 >
//                   <Plus size={20} /> Add
//                 </button>
//               </div>
//               <div className="space-y-3">
//                 {subcategories.map((sub, i) => (
//                   <div key={i} className="flex gap-3">
//                     <input
//                       type="text"
//                       value={sub}
//                       onChange={(e) => updateSubcategory(i, e.target.value)}
//                       placeholder="e.g., Mobile Phones"
//                       className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//                       disabled={saving}
//                     />
//                     {subcategories.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeSubcategoryField(i)}
//                         className="p-3 text-red-600 hover:bg-red-50 rounded-xl"
//                       >
//                         <X size={24} />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-4 pt-6 border-t">
//               <button
//                 type="submit"
//                 disabled={saving || isPending}
//                 className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold px-8 py-4 rounded-xl transition"
//               >
//                 {saving ? (
//                   <Loader2 className="animate-spin" />
//                 ) : (
//                   <Save size={22} />
//                 )}
//                 {saving ? "Saving..." : editingMainId ? "Update" : "Create"}
//               </button>
//               {editingMainId && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Memoized Table - This is the magic */}
//         <MemoizedCategoryTable
//           categories={categories}
//           onEdit={handleEdit}
//           onAskDelete={(id) => openConfirm(id, "delete")}
//           onAskRestore={(id) => openConfirm(id, "restore")}
//           onAskHardDelete={(id) => openConfirm(id, "hardDelete")}
//           deletingId={deletingId}
//           isPending={isPending}
//         />

//         <ConfirmDialog
//           open={confirmState.open}
//           title={
//             confirmState.action === "restore"
//               ? "Restore?"
//               : confirmState.action === "hardDelete"
//               ? "Delete Forever?"
//               : "Delete?"
//           }
//           description="Are you sure?"
//           confirmText={confirmState.action === "restore" ? "Restore" : "Delete"}
//           onConfirm={confirmAction}
//           onCancel={() =>
//             setConfirmState({ open: false, id: null, action: "delete" })
//           }
//         />

//         {toast && (
//           <div
//             className={`fixed bottom-8 right-8 px-8 py-5 rounded-2xl shadow-2xl text-white font-bold z-50 ${
//               toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
//             }`}
//           >
//             {toast.message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Memoized Table - Prevents re-renders while typing!
// const MemoizedCategoryTable = memo(function CategoryTableWrapper({
//   categories,
//   onEdit,
//   onAskDelete,
//   onAskRestore,
//   onAskHardDelete,
//   deletingId,
//   isPending,
// }: {
//   categories: Category[];
//   onEdit: (cat: Category) => void;
//   onAskDelete: (id: string) => void;
//   onAskRestore: (id: string) => void;
//   onAskHardDelete: (id: string) => void;
//   deletingId: string | null;
//   isPending: boolean;
// }) {
//   if (isPending) {
//     return (
//       <div className="text-center py-10 text-gray-500">
//         Loading categories...
//       </div>
//     );
//   }

//   return (
//     <CategoryTable
//       categories={categories}
//       onEdit={onEdit}
//       onAskDelete={onAskDelete}
//       onAskRestore={onAskRestore}
//       onAskHardDelete={onAskHardDelete}
//       deletingId={deletingId}
//     />
//   );
// });

// export default AddCategory;

// updated
// // AddCategory.tsx - FINAL WITH RED BG + TEXT-ONLY VALIDATION
// import React, { useEffect, useState, useTransition, useCallback } from "react";
// import axios from "axios";
// import type { Category } from "@/types/category";
// import ConfirmDialog from "@/ui/ConfirmDialog";
// import {
//   Plus,
//   X,
//   Save,
//   Edit2,
//   Loader2,
//   ChevronDown,
//   ChevronRight,
//   Trash2,
//   RotateCcw,
// } from "lucide-react";

// const AddCategory = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [mainName, setMainName] = useState("");
//   const [subcategories, setSubcategories] = useState<string[]>([""]);
//   const [editingMainId, setEditingMainId] = useState<string | null>(null);
//   const [expanded, setExpanded] = useState<Set<string>>(new Set());

//   const [confirmState, setConfirmState] = useState<{
//     open: boolean;
//     id: string | null;
//     action: "delete" | "restore" | "hardDelete";
//   }>({ open: false, id: null, action: "delete" });

//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [toast, setToast] = useState<{
//     type: "success" | "error";
//     message: string;
//   } | null>(null);
//   const [isPending, startTransition] = useTransition();

//   const API_BASE = `${import.meta.env.VITE_API_URL}/v1/categories`;

//   const showToast = useCallback(
//     (type: "success" | "error", message: string) => {
//       setToast({ type, message });
//       setTimeout(() => setToast(null), 4000);
//     },
//     []
//   );

//   const fetchCategories = useCallback(async () => {
//     try {
//       const { data } = await axios.get<{
//         success: boolean;
//         categories: Category[];
//       }>(`${API_BASE}?admin=true`, { withCredentials: true });
//       if (data.success) {
//         startTransition(() => setCategories(data.categories));
//       }
//     } catch {
//       showToast("error", "Failed to load categories");
//     }
//   }, [API_BASE, showToast]);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const toggleExpand = (id: string) => {
//     setExpanded((prev) => {
//       const next = new Set(prev);
//       if (next.has(id)) {
//         next.delete(id);
//       } else {
//         next.add(id);
//       }
//       return next;
//     });
//   };

//   const addSubcategoryField = () => setSubcategories((prev) => [...prev, ""]);
//   const removeSubcategoryField = (i: number) =>
//     setSubcategories((prev) => prev.filter((_, idx) => idx !== i));

//   const updateSubcategory = (i: number, value: string) => {
//     const filtered = value.replace(/[^a-zA-Z\s]/g, ""); // Only letters & space
//     setSubcategories((prev) => {
//       const next = [...prev];
//       next[i] = filtered;
//       return next;
//     });
//   };

//   const handleMainNameChange = (value: string) => {
//     const filtered = value.replace(/[^a-zA-Z\s]/g, "");
//     setMainName(filtered);
//   };

//   const resetForm = useCallback(() => {
//     setMainName("");
//     setSubcategories([""]);
//     setEditingMainId(null);
//   }, []);

//   const handleEdit = useCallback(
//     (category: Category) => {
//       startTransition(() => {
//         const mainCat = category.isSub
//           ? categories.find((c) => c._id === category.parent)
//           : category;

//         if (!mainCat) return;

//         setMainName(mainCat.name);
//         setEditingMainId(mainCat._id);

//         const subs = mainCat.subcategories?.map((sub) => sub.name).sort() ?? [];

//         setSubcategories(subs.length > 0 ? subs : [""]);
//         setExpanded((prev) => new Set(prev).add(mainCat._id));
//       });
//     },
//     [categories]
//   );

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const trimmedMain = mainName.trim();
//     if (!trimmedMain)
//       return showToast("error", "Main category name is required");
//     if (!/^[a-zA-Z\s]+$/.test(trimmedMain))
//       return showToast(
//         "error",
//         "Main category can only contain letters and spaces"
//       );

//     const trimmedSubs = subcategories.map((s) => s.trim()).filter(Boolean);
//     for (const sub of trimmedSubs) {
//       if (!/^[a-zA-Z\s]+$/.test(sub)) {
//         return showToast("error", `"${sub}" contains invalid characters`);
//       }
//     }

//     const duplicateMain = categories.find(
//       (c) =>
//         c.name.toLowerCase() === trimmedMain.toLowerCase() &&
//         !c.isSub &&
//         c._id !== editingMainId
//     );
//     if (duplicateMain)
//       return showToast("error", `Category "${trimmedMain}" already exists`);

//     setSaving(true);
//     try {
//       let mainCategoryId: string;

//       if (editingMainId) {
//         await axios.put(
//           `${API_BASE}/${editingMainId}`,
//           { name: trimmedMain },
//           { withCredentials: true }
//         );
//         mainCategoryId = editingMainId;
//       } else {
//         const res = await axios.post<{ category: Category }>(
//           API_BASE,
//           { name: trimmedMain, isSub: false },
//           { withCredentials: true }
//         );
//         mainCategoryId = res.data.category._id;
//       }

//       const currentMain = categories.find((c) => c._id === mainCategoryId);
//       const existingSubs = (currentMain?.subcategories || []).filter(
//         (s) => !s.isDeleted
//       );

//       const existingNames = new Set(
//         existingSubs.map((s) => s.name.toLowerCase())
//       );
//       const newNames = new Set(trimmedSubs.map((s) => s.toLowerCase()));

//       const createPromises = trimmedSubs
//         .filter((name) => !existingNames.has(name.toLowerCase()))
//         .map((name) =>
//           axios.post(
//             API_BASE,
//             { name, isSub: true, parent: mainCategoryId },
//             { withCredentials: true }
//           )
//         );

//       const deletePromises = existingSubs
//         .filter((sub) => !newNames.has(sub.name.toLowerCase()))
//         .map((sub) =>
//           axios.delete(`${API_BASE}/${sub._id}`, { withCredentials: true })
//         );

//       await Promise.all([...createPromises, ...deletePromises]);

//       showToast(
//         "success",
//         editingMainId ? "Updated successfully!" : "Created successfully!"
//       );
//       resetForm();
//       fetchCategories();
//     } catch (error) {
//       const err = error as { response?: { data?: { message?: string } } };
//       const message =
//         err.response?.data?.message || "Operation failed. Please try again.";
//       showToast("error", message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const openConfirm = (
//     id: string,
//     action: "delete" | "restore" | "hardDelete"
//   ) => {
//     setConfirmState({ open: true, id, action });
//   };

//   const confirmAction = async () => {
//     if (!confirmState.id) return;
//     setDeletingId(confirmState.id);
//     try {
//       if (confirmState.action === "delete")
//         await axios.delete(`${API_BASE}/${confirmState.id}`, {
//           withCredentials: true,
//         });
//       if (confirmState.action === "restore")
//         await axios.patch(`${API_BASE}/${confirmState.id}/restore`, null, {
//           withCredentials: true,
//         });
//       if (confirmState.action === "hardDelete")
//         await axios.delete(`${API_BASE}/${confirmState.id}/force`, {
//           withCredentials: true,
//         });

//       showToast("success", "Action completed successfully");
//       fetchCategories();
//     } catch {
//       showToast("error", "Action failed");
//     } finally {
//       setDeletingId(null);
//       setConfirmState({ open: false, id: null, action: "delete" });
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold text-gray-900 mb-8">
//           Category Management
//         </h1>

//         {/* Form */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 mb-10">
//           <div className="flex items-center gap-3 mb-8">
//             {editingMainId ? (
//               <Edit2 className="w-7 h-7 text-indigo-600" />
//             ) : (
//               <Plus className="w-7 h-7 text-green-600" />
//             )}
//             <h2 className="text-2xl font-bold text-gray-800">
//               {editingMainId
//                 ? "Edit Category Group"
//                 : "Create New Category Group"}
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-8">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 Main Category <span className="text-red-500">*</span>
//                 <span className="text-xs text-gray-500 ml-2">
//                   (Letters only)
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 value={mainName}
//                 onChange={(e) => handleMainNameChange(e.target.value)}
//                 placeholder="e.g., Electronics"
//                 className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//                 disabled={saving}
//               />
//             </div>

//             <div>
//               <div className="flex justify-between items-center mb-4">
//                 <label className="text-sm font-semibold text-gray-700">
//                   Subcategories{" "}
//                   <span className="text-gray-500 font-normal">
//                     (optional, letters only)
//                   </span>
//                 </label>
//                 <button
//                   type="button"
//                   onClick={addSubcategoryField}
//                   className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
//                 >
//                   <Plus size={20} /> Add
//                 </button>
//               </div>
//               <div className="space-y-3">
//                 {subcategories.map((sub, i) => (
//                   <div key={i} className="flex gap-3">
//                     <input
//                       type="text"
//                       value={sub}
//                       onChange={(e) => updateSubcategory(i, e.target.value)}
//                       placeholder="e.g., Smartphones"
//                       className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
//                       disabled={saving}
//                     />
//                     {subcategories.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeSubcategoryField(i)}
//                         className="p-3 text-red-600 hover:bg-red-50 rounded-xl"
//                       >
//                         <X size={24} />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="flex gap-4 pt-6 border-t">
//               <button
//                 type="submit"
//                 disabled={saving || isPending}
//                 className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold px-8 py-4 rounded-xl transition"
//               >
//                 {saving ? (
//                   <Loader2 className="animate-spin" />
//                 ) : (
//                   <Save size={22} />
//                 )}
//                 {saving ? "Saving..." : editingMainId ? "Update" : "Create"}
//               </button>
//               {editingMainId && (
//                 <button
//                   type="button"
//                   onClick={resetForm}
//                   className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Tree Table */}
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
//           <div className="px-8 py-6 border-b border-gray-200 flex justify-between items-center">
//             <h2 className="text-2xl font-bold text-gray-800">All Categories</h2>
//             <span className="text-sm text-gray-500">
//               Deleted items appear in red
//             </span>
//           </div>

//           {isPending ? (
//             <div className="text-center py-16 text-gray-500">
//               <Loader2 className="inline-block animate-spin mr-3" /> Loading...
//             </div>
//           ) : categories.length === 0 ? (
//             <div className="text-center py-16 text-gray-500">
//               No categories yet.
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {categories
//                 .filter((cat) => !cat.isSub)
//                 .map((mainCat) => {
//                   const allSubs = mainCat.subcategories || [];
//                   const activeSubs = allSubs.filter((s) => !s.isDeleted);
//                   const isExpanded = expanded.has(mainCat._id);

//                   return (
//                     <div key={mainCat._id}>
//                       {/* Main Category Row */}
//                       <div
//                         className={`flex items-center justify-between px-8 py-5 transition ${
//                           mainCat.isDeleted
//                             ? "bg-red-50 border-l-4 border-red-500"
//                             : "hover:bg-gray-50"
//                         }`}
//                       >
//                         <div className="flex items-center gap-3">
//                           {allSubs.length > 0 && (
//                             <button
//                               onClick={() => toggleExpand(mainCat._id)}
//                               className="text-gray-500 hover:text-gray-700"
//                             >
//                               {isExpanded ? (
//                                 <ChevronDown size={20} />
//                               ) : (
//                                 <ChevronRight size={20} />
//                               )}
//                             </button>
//                           )}
//                           <div
//                             className={`font-semibold text-lg ${
//                               mainCat.isDeleted
//                                 ? "line-through text-red-700"
//                                 : "text-gray-900"
//                             }`}
//                           >
//                             {mainCat.name}
//                           </div>
//                           <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                             {activeSubs.length} active / {allSubs.length} total
//                           </span>
//                           {mainCat.isDeleted && (
//                             <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-bold">
//                               DELETED
//                             </span>
//                           )}
//                         </div>

//                         <div className="flex items-center gap-3">
//                           {!mainCat.isDeleted ? (
//                             <>
//                               <button
//                                 onClick={() => handleEdit(mainCat)}
//                                 className="text-indigo-600 hover:bg-indigo-100 p-2 rounded-lg transition"
//                               >
//                                 <Edit2 size={18} />
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   openConfirm(mainCat._id, "delete")
//                                 }
//                                 className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition"
//                                 disabled={deletingId === mainCat._id}
//                               >
//                                 {deletingId === mainCat._id ? (
//                                   <Loader2 size={18} className="animate-spin" />
//                                 ) : (
//                                   <Trash2 size={18} />
//                                 )}
//                               </button>
//                             </>
//                           ) : (
//                             <>
//                               <button
//                                 onClick={() =>
//                                   openConfirm(mainCat._id, "restore")
//                                 }
//                                 className="text-green-600 hover:bg-green-100 p-2 rounded-lg transition"
//                               >
//                                 <RotateCcw size={18} />
//                               </button>
//                               <button
//                                 onClick={() =>
//                                   openConfirm(mainCat._id, "hardDelete")
//                                 }
//                                 className="text-red-800 hover:bg-red-200 p-2 rounded-lg transition"
//                                 title="Delete Forever"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </div>

//                       {/* Subcategories */}
//                       {isExpanded && allSubs.length > 0 && (
//                         <div className="bg-gray-50 border-t border-gray-200">
//                           {allSubs.map((sub) => (
//                             <div
//                               key={sub._id}
//                               className={`flex items-center justify-between px-8 py-4 pl-16 transition ${
//                                 sub.isDeleted
//                                   ? "bg-red-50 border-l-4 border-red-400"
//                                   : "hover:bg-gray-100"
//                               }`}
//                             >
//                               <div className="flex items-center gap-3">
//                                 <div className="w-8" />
//                                 <span
//                                   className={`${
//                                     sub.isDeleted
//                                       ? "line-through text-red-700"
//                                       : "text-gray-700"
//                                   }`}
//                                 >
//                                   └ {sub.name}
//                                 </span>
//                                 {sub.isDeleted && (
//                                   <span className="text-xs bg-red-600 text-white px-3 py-1 rounded-full font-bold">
//                                     DELETED
//                                   </span>
//                                 )}
//                               </div>

//                               <div className="flex items-center gap-2">
//                                 {sub.isDeleted ? (
//                                   <>
//                                     <button
//                                       onClick={() =>
//                                         openConfirm(sub._id, "restore")
//                                       }
//                                       className="text-green-600 hover:bg-green-100 p-2 rounded-lg transition"
//                                     >
//                                       <RotateCcw size={16} />
//                                     </button>
//                                     <button
//                                       onClick={() =>
//                                         openConfirm(sub._id, "hardDelete")
//                                       }
//                                       className="text-red-800 hover:bg-red-200 p-2 rounded-lg transition"
//                                       title="Delete Forever"
//                                     >
//                                       <Trash2 size={16} />
//                                     </button>
//                                   </>
//                                 ) : (
//                                   <button
//                                     onClick={() =>
//                                       openConfirm(sub._id, "delete")
//                                     }
//                                     className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition"
//                                     disabled={deletingId === sub._id}
//                                   >
//                                     {deletingId === sub._id ? (
//                                       <Loader2
//                                         size={16}
//                                         className="animate-spin"
//                                       />
//                                     ) : (
//                                       <Trash2 size={16} />
//                                     )}
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//             </div>
//           )}
//         </div>
//         <ConfirmDialog
//           open={confirmState.open}
//           title={
//             confirmState.action === "restore"
//               ? "Restore Item?"
//               : confirmState.action === "hardDelete"
//               ? "Permanently Delete?"
//               : "Soft Delete?"
//           }
//           description={
//             confirmState.action === "hardDelete"
//               ? "This will permanently remove the item and cannot be undone."
//               : confirmState.action === "restore"
//               ? "This will restore the item."
//               : "This will hide the item (soft delete)."
//           }
//           confirmText={
//             confirmState.action === "restore"
//               ? "Restore"
//               : confirmState.action === "hardDelete"
//               ? "Delete Forever"
//               : "Delete"
//           }
//           variant={
//             confirmState.action === "restore"
//               ? "success" // green
//               : "danger" // red for both delete + hardDelete
//           }
//           onConfirm={confirmAction}
//           onCancel={() =>
//             setConfirmState({ open: false, id: null, action: "delete" })
//           }
//         />

//         {toast && (
//           <div
//             className={`fixed bottom-8 right-8 px-8 py-5 rounded-2xl shadow-2xl text-white font-bold z-50 transition-all ${
//               toast.type === "success" ? "bg-emerald-600" : "bg-red-600"
//             }`}
//           >
//             {toast.message}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddCategory;
