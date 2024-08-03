// 페이지에서 Header를 안 보이게 설정하는 함수

// - 사용법 : 각 페이지에서 아래 함수 넣기
// export const getStaticProps = async () => {
//     return getHeaderStaticProps(false);
//   };

export const getHeaderStaticProps = (showHeader = false) => {
  return {
    props: {
      showHeader, // 사용자 정의 프로퍼티
    },
  };
};
