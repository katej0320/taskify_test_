import React from "react";
import styles from "./Pagination.module.scss";
import Image from "next/image";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  //이전페이지로 이동
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  //다음페이지로 이동
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      <div className={styles.pagination}>
        <span>
          {totalPages} 페이지 중 {currentPage}
        </span>
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          <Image
            src="/icons/paginationprev.png"
            alt="paginationprevbutton"
            width={40}
            height={40}
          />
        </button>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          <Image
            src="/icons/paginationnext.png"
            alt="paginationnextbutton"
            width={40}
            height={40}
          />
        </button>
      </div>
    </>
  );
}
