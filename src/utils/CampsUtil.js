import { IMG_MAX_COUNT, IMG_TYPES } from "../constant/camps";

// 주소검색-다음주소검색API
export const handleComplete = (data) => {
  let fullAddress = data.address;
  let extraAddress = "";

  if (data.addressType === "R") {
    if (data.bname !== "") {
      extraAddress += data.bname;
    }
    if (data.buildingName !== "") {
      extraAddress +=
        extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  }

  return fullAddress;
};

// 부대시설 목록 체크
export const onAmenitiesChecked = (e, items, setter) => {
  const target = e.currentTarget;
  const checked = target.checked;
  const item = target.value;

  if (checked) {
    setter([...items, item]);
  } else if (!checked) {
    setter(items.filter((el) => el !== item));
  }
};

// 단일 이미지 파일업로드
export const onUploadImage = (e, prevImgSetter, imgSetter) => {
  const target = e.currentTarget;
  const file = target.files[0];

  // 파일이 없는 경우
  if (file === undefined) {
    return;
  }

  // 파일 형식이 잘못된 경우
  if (!IMG_TYPES.includes(file.type)) {
    e.currentTarget.value = "";
    alert("파일 형식이 잘못되었습니다.");
    prevImgSetter("");
    return;
  }

  // 미리보기 생성
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onloadend = () => {
    prevImgSetter(fileReader.result);
  };
  imgSetter(file);
};

// 여러개의 이미지 파일업로드
export const onUploadMultipleImage = (e, prevImgsSetter, imgsSetter) => {
  const target = e.currentTarget;
  const files = target.files;
  const list = []; // 이미지데이터
  const prevs = []; // 미리보기

  // 파일이 없는 경우
  if (files === undefined) {
    return;
  }

  // 최대 10장까지만 이미지 등록 가능
  if (files.length > IMG_MAX_COUNT) {
    alert(`최대 ${IMG_MAX_COUNT}개까지만 업로드가능합니다.`);
    e.currentTarget.value = ""; // 파일 인풋 초기화
    prevImgsSetter([]); // 미리보기 초기화
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // 파일 형식이 잘못된 경우
    if (!IMG_TYPES.includes(file.type)) {
      e.currentTarget.value = "";
      alert("파일 형식이 잘못되었습니다.");
      return;
    }

    list.push(file);

    // 미리보기 생성
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      prevs.push(fileReader.result);
      prevImgsSetter(prevs);
    };
  }

  imgsSetter(list);
};

// failed to execute 'append' on 'formdata': parameter 2 is not of type 'blob'. 에러
// img url => File
export const convertURLtoFile = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    withCredentials: true,
    crossorigin: true,
    mode: "no-cors",
  });
  const data = await response.blob();
  const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
  const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
  const metadata = { type: `image/${ext}` };
  return new File([data], filename, metadata);
};
