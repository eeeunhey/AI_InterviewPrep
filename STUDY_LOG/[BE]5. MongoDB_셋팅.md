왜 MongoDB를 쓸가

자유로운 스키마(문서 모델)
테이블-칼럼보다 JSON 문서로 저장 → 필드가 자주 바뀌는 서비스(스타트업/프로토타이핑)에 유연.

자바스크립트 친화적
요청/응답/DB 모두 JSON(Node.js와 궁합↑). Mongoose로 밸리데이션·관계 관리도 쉬움.

수평 확장 쉬움
샤딩으로 큰 데이터/높은 트래픽에 대응. 레플리카셋으로 고가용성(장애 대비).

풍부한 인덱스 & 기능
단일/복합/부분/TTL/텍스트/지오스페이셜 인덱스, Aggregation Pipeline, Change Streams(실시간 스트림) 등.

트랜잭션 지원
4.x부터 멀티 도큐먼트 ACID 트랜잭션 지원 → 필요한 곳에 원자성 보장.

운영 편의(Atlas)
클라우드 매니지드(백업·모니터링·스케일링)로 운영 부담 ↓


로그인 -> 새로운 프로젝트 생성한다 - > 사용자 이름 : test 
 비밀번호를 복사한다 -> 계정 생성 버튼을 클릭
-> choose a connection Method 클릭
Drivers 클릭 -> Driver Node.js 로 선택 version 은 지금 쓰는거 선택하세요 -> Done

Clusters 블럭이 생성
Connect 버튼을 클릭 -> driver 버튼 클릭 -> 아까 셋팅하던 창이 나오는데
거기서 
use this connection String in your application
아래에 있는 코드 블록을 복사한다

mongodb+srv://test:<db_password (비밀번호 넣기)>
우측 메뉴 SECURLTY -> Database Access 클릭 -> 아까 생성한 계정이 있음
-> EDIT 버튼 클릭 -> Edit User 창이 열린다

Edit Password 버튼 클릭한다 -> Autogenerate Secure Password 버튼 클릭 -> 비민번호 자동생성 -> copy 클릭 -> .env 들어가서 붙여넣으면 된다 mongodb+srv://test: 복사한 비밀번호 붙여넣음

Server.js 수정한다
