import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// === «عسل فاتح» — نسخه کامل (Next.js/React + Tailwind)
// - تم تیره لوکس با طلایی
// - فونت فارسی (B Nazanin) سراسری
// - فروشگاه سبک با سبد خرید و جمع کل
// - پنل مدیریت سبک (Client CMS) با ذخیره در localStorage + خروجی/ورودی JSON
// - تزئینات زنبور و قاب‌های کلاسیک

export default function FatehSite() {
  const STORAGE_KEY = "fateh_site_data_v1";

  // ------- State: content + cart + admin -------
  const [data, setData] = useState(() =>
    typeof window === "undefined"
      ? defaultData
      : (() => {
          try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) : defaultData;
          } catch {
            return defaultData;
          }
        })()
  );
  const [cart, setCart] = useState([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  const total = useMemo(
    () => cart.reduce((s, it) => s + it.price * it.qty, 0),
    [cart]
  );

  function addToCart(p) {
    setCart((prev) => {
      const idx = prev.findIndex((x)
