"use client";

import { excuteRedirect } from "@/app/actions";
import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext } from "react";

type ProviderValue = {
  onCloseModal: (redirectPathname?: string) => void;
};

const ModalContext = createContext<ProviderValue | null>({
  onCloseModal: () => void 0,
});

export const useModalProvider = () => useContext(ModalContext)!;

export default function ModalProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const onCloseModal = (redirectPathname?: string) => {
    // review: 하지만 모달창이 닫히기 전에 refresh 를 하고 back 을 해주면
    // 갱신된 데이터를 조회해오나(RSC Payload) 화면에 반영되지 않음.
    // 그리고 back 보단 replace 를 해주는게 ux 상으로 올바름

    // review: 15rc 부터 push, replace 로 페이지이동하면 page.tsx 를 캐시하지 않음
    // pathname 은 바뀌나 모달창이 안닫힘..
    // router.replace("/board");

    // review: 일단 모달창이 닫히도록 back 사용한 뒤, 서버에서 redirect 처리
    // router.back();
    // router.replace("/board");
    if (redirectPathname) {
      excuteRedirect(redirectPathname);
    }
    router.back();
  };

  const value = { onCloseModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
