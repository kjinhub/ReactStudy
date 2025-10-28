// ✅ React에서 상태(useState)와 메모이제이션(useMemo) 훅을 가져옴
import { useMemo, useState } from "react";

// ✅ 게시글 데이터 처리 로직(queryPosts)과 샘플 데이터(posts) 불러오기
import { queryPosts } from "./lib/posts";
import { posts } from "./data/post_data";
// src/data
// ✅ 스타일 시트 적용
import "./App.css";

// 🔹 App 컴포넌트 (전체 게시판의 루트)
export default function App() {
  // 🔸 검색어 상태
  const [q, setQ] = useState("");
  // 🔸 정렬 기준 상태 (기본값: 최신순)
  const [sortKey, setSortKey] = useState("createdAt");
  // 🔸 현재 페이지 번호 상태 (기본값: 1페이지)
  const [page, setPage] = useState(1);

  /**
   * 🔹 useMemo를 이용해 결과 계산 최적화
   * queryPosts()는 검색, 정렬, 페이지네이션을 통합 처리하는 함수
   * q, sortKey, page 값이 바뀔 때만 다시 계산
   * size: 한 페이지에 표시할 게시글 수 (5개)
   */
  const res = useMemo(
    () => queryPosts(posts, { query: q, sortKey, page, size: 5 }),
    [q, sortKey, page]
  );

  // 🔹 화면 렌더링 부분
  return (
    <div className="container">
      {/* 제목 영역 */}
      <h1 className="title">게시판 검색·정렬·페이지네이션</h1>

      {/* 🔸 검색창과 정렬 셀렉트 */}
      <div className="toolbar">
        {/* 검색 입력창 */}
        <input
          className="input"
          value={q}
          onChange={(e) => {
            setPage(1); // 검색 시 항상 1페이지부터 시작
            setQ(e.target.value); // 검색어 상태 갱신
          }}
          placeholder="검색"
        />

        {/* 정렬 옵션 선택 */}
        <select
          className="select"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value)}>
          <option value="createdAt">최신순</option>
          <option value="likes">좋아요 내림차순</option>
          <option value="title_asc">제목 오름차순</option>
          <option value="title_desc">제목 내림차순</option>
        </select>
      </div>

      {/* 🔸 게시글 목록 출력 */}
      <div className="list">
        {res.items.map((p) => (
          <div className="item" key={p.id}>
            {/* 제목 */}
            <div className="itemTitle">{p.title ?? "(제목없음)"}</div>

            {/* 메타데이터 (좋아요 + 작성일) */}
            <div className="meta">
              <span>♥{p.likes}</span>
              <span>{new Date(p.createdAt).toLocaleString("ko-KR")}</span>
            </div>

            {/* 본문 내용 */}
            <div className="body">{p.body}</div>
          </div>
        ))}
      </div>

      {/* 🔸 페이지네이션 버튼 */}
      <div className="pagination">
        {/* 이전 버튼: 1페이지일 때 비활성화 */}
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={res.meta.current === 1}>
          이전
        </button>

        {/* 현재 페이지 / 총 페이지 표시 */}
        <span>
          {res.meta.current} / {res.meta.totalPages}
        </span>

        {/* 다음 버튼: 마지막 페이지일 때 비활성화 */}
        <button
          onClick={() => setPage((p) => Math.min(res.meta.totalPages, p + 1))}
          disabled={res.meta.current === res.meta.totalPages}>
          다음
        </button>
      </div>
    </div>
  );
}
