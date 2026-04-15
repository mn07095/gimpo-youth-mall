"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type StoredUser = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

type SiteContextValue = {
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
  todayVisits: number;
  totalVisits: number;
  pageViews: number;
  login: (payload?: LoginPayload) => { ok: boolean; message?: string };
  logout: () => void;
  signup: (payload: SignupPayload) => { ok: boolean; message?: string };
  updateProfile: (payload: Pick<SignupPayload, "name" | "phone">) => { ok: boolean; message?: string };
};

const VISIT_STORAGE_KEY = "gimpo-youth-mall-visit-stats";
const SESSION_VISIT_KEY = "gimpo-youth-mall-session-visited";
const USER_STORAGE_KEY = "gimpo-youth-mall-user";
const USERS_STORAGE_KEY = "gimpo-youth-mall-users";

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

function getDefaultUser(): StoredUser {
  return {
    name: "김민서",
    email: "minseo@gimpo-youth-mall.kr",
    password: "1234",
    phone: "010-1234-5678",
  };
}

function readUsers() {
  const rawUsers = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (!rawUsers) {
    const defaultUsers = [getDefaultUser()];
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }

  try {
    return JSON.parse(rawUsers) as StoredUser[];
  } catch {
    const defaultUsers = [getDefaultUser()];
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
}

function persistUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("게스트");
  const [userEmail, setUserEmail] = useState("");
  const [todayVisits, setTodayVisits] = useState(0);
  const [totalVisits, setTotalVisits] = useState(0);
  const [pageViews, setPageViews] = useState(0);

  useEffect(() => {
    const users = readUsers();
    const rawUser = window.localStorage.getItem(USER_STORAGE_KEY);

    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser) as { isLoggedIn: boolean; userName: string; userEmail: string };
        setIsLoggedIn(parsed.isLoggedIn);
        setUserName(parsed.userName);
        setUserEmail(parsed.userEmail);
      } catch {
        const guestState = { isLoggedIn: false, userName: "게스트", userEmail: "" };
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(guestState));
      }
    } else {
      const defaultUser = users[0];
      const guestState = { isLoggedIn: false, userName: defaultUser.name, userEmail: defaultUser.email };
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(guestState));
      setUserName(defaultUser.name);
      setUserEmail(defaultUser.email);
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
      userEmail,
      todayVisits,
      totalVisits,
      pageViews,
      login: (payload) => {
        const users = readUsers();
        const targetUser = payload
          ? users.find((user) => user.email === payload.email && user.password === payload.password)
          : users[0];

        if (!targetUser) {
          return { ok: false, message: "이메일 또는 비밀번호를 확인해주세요." };
        }

        const nextState = { isLoggedIn: true, userName: targetUser.name, userEmail: targetUser.email };
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextState));
        setIsLoggedIn(true);
        setUserName(targetUser.name);
        setUserEmail(targetUser.email);
        return { ok: true };
      },
      logout: () => {
        const nextState = { isLoggedIn: false, userName: "게스트", userEmail: "" };
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextState));
        setIsLoggedIn(false);
        setUserName("게스트");
        setUserEmail("");
      },
      signup: (payload) => {
        const users = readUsers();
        if (users.some((user) => user.email === payload.email)) {
          return { ok: false, message: "이미 가입된 이메일입니다." };
        }

        const nextUser: StoredUser = {
          name: payload.name,
          email: payload.email,
          password: payload.password,
          phone: payload.phone,
        };
        const nextUsers = [nextUser, ...users];
        persistUsers(nextUsers);

        const nextState = { isLoggedIn: true, userName: nextUser.name, userEmail: nextUser.email };
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextState));
        setIsLoggedIn(true);
        setUserName(nextUser.name);
        setUserEmail(nextUser.email);
        return { ok: true };
      },
      updateProfile: (payload) => {
        if (!userEmail) {
          return { ok: false, message: "로그인 후 이용해주세요." };
        }

        const users = readUsers();
        const nextUsers = users.map((user) =>
          user.email === userEmail
            ? {
                ...user,
                name: payload.name,
                phone: payload.phone,
              }
            : user,
        );
        persistUsers(nextUsers);

        const nextState = { isLoggedIn, userName: payload.name, userEmail };
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextState));
        setUserName(payload.name);
        return { ok: true };
      },
    }),
    [isLoggedIn, pageViews, todayVisits, totalVisits, userEmail, userName],
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
