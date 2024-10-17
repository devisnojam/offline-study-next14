"use client";

import { useRouter } from "next/navigation";
import { createContext, PropsWithChildren, useContext } from "react";

type ProviderValue = {
  onCloseModal: (param?: { isRefresh: boolean }) => void;
};

const ModalContext = createContext<ProviderValue | null>({
  onCloseModal: () => void 0,
});

export const useModalProvider = () => useContext(ModalContext)!;

export default function ModalProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const onCloseModal = (param?: { isRefresh: boolean }) => {
    console.log("modal provider close: ", param);

    // review: 하지만 모달창이 닫히기 전에 refresh 를 하고 back 을 해주면
    // 갱신된 데이터를 조회해오나(RSC Payload) 화면에 반영되지 않음.
    if (!!param?.isRefresh) {
      router.refresh();
    }
    router.back();

    // REVIEW: 클라이언트 route caching 무효화 테스트 - 동작확인함
    // router.refresh();
  };

  const value = { onCloseModal };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
