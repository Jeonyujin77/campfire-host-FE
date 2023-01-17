export interface CampInfoProps {
  campAddress: string; // 주소
  // campAmenities: string[]; // 부대시설
  campDesc: string; // 업체소개
  campId: number; // 캠핑장 아이디
  hostId: number; // 호스트 아이디
  campMainImage: string; // 대표사진
  campName: string; // 캠핑장명
  // campPrice: number; // 최소가격
  campSubImages: string[]; // 추가사진
  checkIn: string; // 입실시간
  checkOut: string; // 퇴실시간
  createdAt: string; // 생성시간
  updatedAt: string; // 수정시간
}

// 캠핑장 기본정보 수정
export interface CampModifyInfo {
  formData: FormData;
  campId: number;
}

// 캠핑장아이디, 캠핑장명
export interface CampListInfo {
  campId: number;
  campName: string;
}
