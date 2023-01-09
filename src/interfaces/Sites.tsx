// 사이트 기본정보 등록/수정
export interface SiteInfo {
  formData: FormData;
  campId: number;
}

// 사이트 정보
export interface Site {
  siteId: number;
  campId: number;
  hostId: number;
  siteName: string;
  sitePrice: number;
  siteMainImage: string;
  minPeople: number;
  maxPeople: number;
}
