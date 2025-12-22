// src/admin/customers/CustomersPage.tsx
import { useEffect, useState } from "react";
import type { Customer } from "@/types/customer";
import type { CustomerStats } from "@/types/customer";

import CustomerFilters from "./components/CustomerFilters";
import CustomerTable from "./components/CustomerTable";
import CustomerStatsNo from "./components/CustomerStatsNo";
import TopCustomers from "./components/TopCustomers";
import CityDistribution from "./components/CityDistribution";

import { fetchCustomers, fetchCustomerAnalytics } from "@/lib/api";

type Pagination = {
  page: number;
  total: number;
  totalPages: number;
};

export default function CustomersPage() {
  /** ---------------- UI draft state (no API calls) ---------------- */
  const [searchInput, setSearchInput] = useState("");
  const [period, setPeriod] = useState<"7d" | "30d" | "month" | undefined>();
  const [repeat, setRepeat] = useState<"new" | "repeat" | undefined>();

  /** ---------------- Applied state (API-driven) ---------------- */
  const [searchQuery, setSearchQuery] = useState<string | undefined>();

  /** ---------------- Table state ---------------- */
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [tableLoading, setTableLoading] = useState(false);

  /** ---------------- Analytics (load once) ---------------- */
  const [stats, setStats] = useState<CustomerStats | null>(null);

  /* ==========================================================
     Fetch analytics ONCE
  ========================================================== */
  useEffect(() => {
    fetchCustomerAnalytics().then((res) => setStats(res.data));
  }, []);

  /* ==========================================================
     Fetch customers (table only)
  ========================================================== */
  useEffect(() => {
    setTableLoading(true);

    fetchCustomers({
      page,
      limit,
      q: searchQuery,
      sortBy,
      order,
      period,
      repeat,
    })
      .then((res) => {
        setCustomers(res.data);
        setPagination(res.pagination);
      })
      .finally(() => setTableLoading(false));
  }, [page, limit, searchQuery, sortBy, order, period, repeat]);

  /* ==========================================================
     Apply Search (IMPORTANT)
  ========================================================== */
  function applySearch() {
    setPage(1);
    setSearchQuery(searchInput.trim() || undefined);
  }

  /* ==========================================================
     Sort handler (table header)
  ========================================================== */
  function handleSort(field: string) {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("desc");
    }
    setPage(1);
  }

  return (
    <div className="p-6 space-y-8">
      {/* ================= KPI ================= */}
      <CustomerStatsNo customers={customers} />

      {/* ================= Filters ================= */}
      <CustomerFilters
        search={searchInput}
        onSearchChange={setSearchInput}
        onApply={applySearch}
        period={period}
        onPeriodChange={(v) => {
          setPage(1);
          setPeriod(v);
        }}
        repeat={repeat}
        onRepeatChange={(v) => {
          setPage(1);
          setRepeat(v);
        }}
        sortBy={sortBy}
        order={order}
        onSortChange={(field, dir) => {
          setSortBy(field);
          setOrder(dir);
          setPage(1);
        }}
        count={pagination?.total ?? 0}
      />

      {/* ================= Table ================= */}
      <CustomerTable
        data={customers}
        page={page}
        pagination={pagination}
        onPageChange={setPage}
        sortBy={sortBy}
        order={order}
        onSort={handleSort}
      />

      {tableLoading && (
        <div className="text-sm text-gray-500">Loading customers…</div>
      )}

      {/* ================= Analytics ================= */}
      {stats && (
        <div className="grid lg:grid-cols-2 gap-8">
          <TopCustomers customers={stats.topCustomers} />
          <CityDistribution data={stats.cityData} />
        </div>
      )}
    </div>
  );
}
