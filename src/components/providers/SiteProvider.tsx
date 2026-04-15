"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type SiteContextValue = {
  isLoggedIn: boolean;
  userName: string;
  todayVisits: number;
  totalVisits: number;
  pageViews: number;
  login: () => void;
  logout: () => void;
};

const VISIT_STORAGE_KEY = "gimpo-youth-mall-visit-stats";
const SESSION_VISIT_KEY = "gimpo-youth-mall-session-visited";
const USER_STORAGE_KEY = "gimpo-youth-mall-user";

const SiteContext = createContext<SiteContextValue | null>(null);

type StoredVisitStats = {
  date: string;
  todayVisits: number;
  totalVisits: number;
  pageViews: number;
};

function getTodayLabel() {
  return new Date().toLocaleDateString("ko-KR");
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("김민서");
  const [todayVisits, setTodayVisits] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [pageViews, setPageViews] = useState(0);

  useEffect(() => {
    const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);
    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser) as { isLoggedIn: boolean; userName: string };
        setIsLoggedIn(parsed.isLoggedIn);
        setUserName(parsed.userName);
      } catch {
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
    } else {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify({ isLoggedIn: true, userName: "김민서" }));
    }

    const rawStats = window.localStorage.getItem(VISIT_STORAGE_KEY);
    const today = getTodayLabel();
    let nextStats: StoredVisitStats = {
      date: today,
      todayVisits: 0,
      totalVisits: 0,
      pageViews: 0,
    };

    if (rawStats) {
      try {
        const parsed = JSON.parse(rawStats) as StoredVisitStats;
        nextStats = parsed.date === today ? parsed : { ...parsed, date: today, todayVisits: 0, pageViews: 0 };
      } catch {
        window.localStorage.removeItem(VISIT_STORAGE_KEY);
      }
    }

    const hasSessionVisit = window.sessionStorage.getItem(SESSION_VISIT_KEY);
    if (!hasSessionVisit) {
      nextStats.todayVisits += 1;
      nextStats.totalVisits += 1;
      window.sessionStorage.setItem(SESSION_VISIT_KEY, "true");
    }

    nextStats.pageViews += 1;
    window.localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(nextStats));
    setTodayVisits(nextStats.todayVisits);
    setTotalVisits(nextStats.totalVisits);
    setPageViews(nextStats.pageViews);
  }, []);

  useEffect(() => {
    if (!pathname) return;
    if (previousPathRef.current === null) {
      previousPathRef.current = pathname;
      return;
    }
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;

    const rawStats = window.localStorage.getItem(VISIT_STORAGE_KEY);
    if (!rawStats) return;

    try {
      const parsed = JSON.parse(rawStats) as StoredVisitStats;
      const nextStats = { ...parsed, pageViews: parsed.pageViews + 1 };
      window.localStorage.setItem(VISIT_STORAGE_KEY, JSON.stringify(nextStats));
      setPageViews(nextStats.pageViews);
      setTodayVisits(nextStats.todayVisits);
      setTotalVisits(nextStats.totalVisits);
    } catch {
      window.localStorage.removeItem(VISIT_STORAGE_KEY);
    }
  }, [pathname]);

  const value = useMemo<SiteContextValue>(
    () => ({
      isLoggedIn,
      userName,
      todayVisits,
      totalVisits,
      pageViews,
      login: () => {
        const nextState = { isLoggedIn: true, userName: "김민서" };
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextState));
        setIsLoggedIn(true);
        setUserName("김민서");
      },
      logout: () => {
        const nextState = { isLoggedIn: false, userName: "게스트" };
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextState));
        setIsLoggedIn(false);
        setUserName("게스트");
      },
    }),
    [isLoggedIn, pageViews, todayVisits, totalVisits, userName],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);

  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }

  return context;
}
