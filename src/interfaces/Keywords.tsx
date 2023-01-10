export interface KeywordsInfo {
  campAmenities: string[] | null;
  envLists: string[] | null;
  typeLists: string[] | null;
  themeLists: string[] | null;
}

// 키워드 수정 
export interface Keywords {
  campId: string;
  keywordList: string[];
}
