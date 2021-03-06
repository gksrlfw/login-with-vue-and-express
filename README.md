# login-with-vue-and-express
### 기능
- [X] 로컬 로그인 (반쪽 - 로컬 스토리지에 id, password 저장 -> 토큰으로 인증할 수 있도록 바꾸기)
- [ ] 구글 로그인
- [ ] 페이스북 로그인
- [ ] 카카오 로그인
- [X] 게시글 작성
- [X] 이미지 업로드
- [ ] 이미지 여러장 업로드
- [X] 게시글 삭제
- [ ] 게시글 수정
- [X] 프로필 정보
- [X] 유저 팔로잉
- [X] 유저 언팔로잉
- [X] 팔로잉 목록
- [ ] 팔로워 목록

### 문제
- [X] VUE에서 같은 URL 주소에서 이동 시, 에러 발생 -> router의 name을 이용해서 같은 페이지면 이동하지 않도록 함
- [X] VUE에서 PROXY 설정방법 -> vue.config.js를 이용해야 함
- [X] VUE에서 main.js에서 this에서 사용할 프로퍼티를 정의 가능 -> axios를 this.$http를 이용하여 사용가능
- [X] VUE와 EXPRESS를 같이 쓰려면 포트 번호가 다름 -> CORS 에러가 나서 처음에는 CORS 모듈을 썻지만 결국은 세션 문제로 PROXY를 이용해야 했음 (서로 포트 번호가 다르니 세션이 유지되지 않았음)
- [X] passport의 deseriallize는 세션을 통해 실행되므로 세션이 없으면 실행되지 않았음

- [ ] store 내부에서 router를 사용하려면 router/index를 임포트 하면 됨 -> route도 사용하고 싶은데 검색이 잘 안됨...
- [ ] 컴포넌트에서 mapStates가 동작하지 않아서 mapGetters를 이용함 -> 왜 안되는지 이유를 모르겠음..
- [ ] 카카오 로그인 시, 카카오 페이지를 갓다가 왔을 때 에러 발생 -> 아무리 해봐도 원인을 모르겠음..
- [ ] 'Bulletproof node.js project architecture' 번역글을 보고 router와 비지니스 로직을 분리함 -> 비지니스 로직, DI를 필요로 하는 상황에 대한 정확한 개념이 잡히지 않아서 올바른 방법인지 모르겠음..
- [ ] req, res를 로직과 분리하여 unit test 코드 작성 시 확실히 편리했지만 model을 mock 하는 방법이 정확한 건지 모르겠음..
