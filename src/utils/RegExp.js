export const emailValid = (email) => {
  let regExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  return regExp.test(email);
};

export const nicknameValid = (nickname) => {
  let regExp = /^[a-zㄱ-ㅎ가-힣0-9-\s]{4,16}$/;

  return regExp.test(nickname);
};

export const pwValid = (pw) => {
  // 비밀번호 8~16자 영문 대 소문자, 숫자, 특수문자
  let regExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  return regExp.test(pw);
};

export const compNumValid = (compNum) => {
  let regExp = /^[0-9]{3}-[0-9]{2}-[0-9]{5}$/;

  return regExp.test(compNum);
};

export const telValid = (tel) => {
  let regExp = /^\d{2,3}\d{3,4}\d{4}$/;

  return regExp.test(tel);
};
