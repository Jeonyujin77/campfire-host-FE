// 호스트 회원가입 정보
export interface HostInfo {
  email: string;
  hostName: string;
  password: string;
  brandName: string;
  companyNumber: string;
  phoneNumber: string;
}

// 사업자번호확인 정보
export interface CompanyCheck {
  brandName: string;
  companyNumber: string;
}

// 호스트 로그인 정보
export interface HostLogin {
  email: string;
  password: string;
}

// 호스트 정보
export interface HostFullInfo {
  hostId?: number;
  email?: string;
  hostName: string;
  phoneNumber: string;
  profileImg: string;
}

// 호스트 정보 수정
export interface HostModifyInfo {
  formData: FormData;
  hostId: number;
}

// 회원탈퇴
export interface DeleteHostAccount {
  hostId: number;
  password: string;
}
