"use client";

// Auth client fictif — projet frontend only
export function signIn() {
  return Promise.resolve({ data: true, error: null });
}

export function signOut() {
  return Promise.resolve();
}

export function signUp() {
  return Promise.resolve({ data: true, error: null });
}

export function useSession() {
  return {
    data: {
      user: {
        name: "Admin Djem's Stay",
        email: "admin@djemsstay.com",
        image: "/images/user/user-01.png",
      },
    },
    isPending: false,
  };
}

export const authClient = {
  updateUser: (_data: Record<string, unknown>) => Promise.resolve({ data: true, error: null }),
};

export function getSession() {
  return Promise.resolve({
    user: {
      name: "Admin Djem's Stay",
      email: "admin@djemsstay.com",
      image: "/images/user/user-01.png",
    },
  });
}
