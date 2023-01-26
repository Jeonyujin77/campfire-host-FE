// 사이트 기본정보 등록/수정
export interface SiteInfo {
  formData: FormData;
  campId: number;
  siteId?: number;
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

// 사이트 상세조회
export interface SiteDetailParam {
  siteId: string;
  campId: string;
}

// 사이트 상세정보
export interface SiteInfoProps {
  campId: number;
  hostId: number;
  siteId: number;
  maxPeople: number;
  minPeople: number;
  siteName: string;
  sitePrice: number;
  siteDesc: string;
  siteInfo: string;
  siteMainImage: string;
  siteSubImages: string[];
  roomCount: number;
}
