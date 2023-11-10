import cn from "classnames";
import { Icons } from "../wallet/assets";
import { useModalStore } from "@/features/modal";
import { FC, useCallback, useMemo } from "react";
import { contentFromModalType } from "./Modal.mappers";
import { closableModals } from "./Modal.constants";
import styles from "./Modal.module.scss";

export const Modal: FC = () => {
  const closeModal = useModalStore((state) => state.closeModal);

  const closeClickCallback = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const modalType = useModalStore((state) => state.modalType);

  const { isModalShow, content } = useMemo(() => {
    const content = modalType ? contentFromModalType[modalType] ?? null : null;

    const isModalShow = Boolean(content);

    return {
      isModalShow,
      content,
    };
  }, [modalType]);

  const isCloseShow = useMemo(
    () => (modalType ? closableModals.includes(modalType) : false),
    [modalType]
  );

  return (
    <div className={cn(styles.modal, { [styles.show]: isModalShow })}>
      <div className={styles.content}>
        {isCloseShow && (
          <div onClick={closeClickCallback} className={styles.close}>
            {/* <Icons.Close /> */}X
          </div>
        )}
        {content}
      </div>
    </div>
  );
};
