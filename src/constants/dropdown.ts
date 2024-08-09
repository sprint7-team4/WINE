export enum HEADER_MENU {
  LOGOUT = "로그아웃",
  MY_PAGE = "마이페이지",
}

export enum EDIT_MENU {
  EDIT = "수정하기",
  DELETE = "삭제하기",
}

export type MenuItem = HEADER_MENU | EDIT_MENU;
