/**
 * @typedef {{id:number,title?:string,body?:string,likes?:number,createdAt?:string}} Post
 * Post 객체 타입 정의
 * - id: 고유 번호
 * - title: 제목 (선택적)
 * - body: 본문 내용 (선택적)
 * - likes: 좋아요 수 (선택적)
 * - createdAt: 생성일 (선택적)
 */

// 🔹 문자열 검색어를 배열 형태로 변환
export function parseQuery(raw) {
  const q = (raw ?? "").trim(); // 입력 문자열이 없으면 빈 문자열 처리 후 공백 제거
  if (!q) return []; // 아무 입력이 없으면 빈 배열 반환
  return q.split(/\s+/).filter(Boolean); // 공백 기준으로 단어 분리, 빈 문자열 제거
}

/**
 * 🔹 게시글 필터링 함수
 * posts: 전체 게시글 배열
 * rawQuery: 검색어 입력 문자열
 * => 검색어가 포함된 게시글만 반환
 */
export function filterPosts(posts, rawQuery) {
  const include = parseQuery(rawQuery); // 검색어 배열 생성
  const list = Array.isArray(posts) ? posts : []; // posts가 배열인지 확인

  // include 배열이 비었으면 전체 반환
  // include에 단어가 있으면 제목(title) 또는 본문(body)에 포함된 항목만 남김
  return list.filter((p) =>
    include.length === 0
      ? true
      : include.some(
          (t) =>
            [p.title, p.body] // 제목과 본문을 하나의 문자열로 합침
              .join(" ")
              .toLowerCase() // 소문자로 변환하여 대소문자 무시
              .includes(t.toLowerCase()) // 검색어 포함 여부 확인
        )
  );
}

/**
 * 🔹 정렬 기준에 따른 비교 함수(comparator) 생성기
 * key: createdAt / likes / title_asc / title_desc
 * => 해당 기준에 따라 두 객체를 비교하는 함수를 반환
 */
function comparator(key) {
  // 작성일 기준 내림차순 (최근 게시글 우선)
  if (key === "createdAt")
    return (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

  // 좋아요 기준 내림차순
  if (key === "likes") return (a, b) => b.likes - a.likes;

  // 제목 오름차순 (가나다순)
  if (key === "title_asc")
    return (a, b) => a.title.localeCompare(b.title, "ko");

  // 제목 내림차순 (역순)
  if (key === "title_desc")
    return (a, b) => b.title.localeCompare(a.title, "ko");

  // 기본값: 정렬하지 않음
  return () => 0;
}

/**
 * 🔹 게시글 정렬 함수
 * posts: 게시글 배열
 * key: 정렬 기준 (createdAt, likes, title_asc, title_desc)
 */
export function sortPosts(posts, key) {
  const cmp = comparator(key); // 정렬 기준 함수 생성
  // 배열 복사 후 sort 적용 (원본 변형 방지)
  return (Array.isArray(posts) ? posts : []).slice().sort(cmp);
}

/**
 * 🔹 페이지네이션 함수
 * list: 전체 데이터
 * page: 현재 페이지 번호
 * size: 페이지당 항목 수
 * => 특정 페이지의 데이터와 페이지 정보(meta)를 함께 반환
 */
export function paginate(list, page, size) {
  const arr = Array.isArray(list) ? list : []; // 유효한 배열인지 확인
  const perPage = Math.max(1, Number(size) || 10); // 최소 1개 이상 표시
  const total = arr.length; // 전체 데이터 개수
  const totalPages = Math.max(1, Math.ceil(total / perPage)); // 총 페이지 수
  const current = Math.min(totalPages, Math.max(1, Number(page) || 1)); // 현재 페이지 유효화
  const start = (current - 1) * perPage; // 시작 인덱스
  const end = start + perPage; // 끝 인덱스

  return {
    items: arr.slice(start, end), // 현재 페이지 데이터
    meta: { total, perPage, totalPages, current }, // 페이지 관련 정보
  };
}

/**
 * 🔹 통합 쿼리 함수
 * posts: 게시글 원본 배열
 * query: 검색어
 * sortKey: 정렬 기준
 * page: 현재 페이지
 * size: 페이지당 항목 수
 * => 검색 + 정렬 + 페이지네이션을 순서대로 실행
 */
export function queryPosts(
  posts,
  { query = "", sortKey = "createdAt", page = 1, size = 10 } = {}
) {
  const filtered = filterPosts(posts, query); // ① 검색 필터 적용
  const sorted = sortPosts(filtered, sortKey); // ② 정렬 적용
  return paginate(sorted, page, size); // ③ 페이지네이션 적용
}
