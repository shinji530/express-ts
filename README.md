package.json에서
```
"dev": "nodemon --watch src --exec ts-node src/app.ts"
```
- nodemon의 경우 ts-node로 알아서 실행하기 때문에 --exc ts-node src/app.ts는 빼줘도 된다.
- ts-node나 nodemon의 경우 배포 환경에서는 사용하지 않는다.

express의 경우 라이브러리 자체에서 type 정보를 지원하지 않는다. 그래서 @types/express를 설치해야 한다.

npm의 express를 확인해보면 DT 아이콘이 있는 것을 볼 수 있는데 이는 type을 따로 지원해주고 있다는 뜻이다.

react의 경우는 라이브러리가 type과 같이 배포된 경우로 built-in으로 타입이 적용되어 있다.

axios의 경우는 type이 같이 배포된 경우임

타입을 정의할 수 있는데
```
import Express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId: string
    }
  }
}
```
위처럼 정할 수 있다. module을 사용하고 있기 때문에 import나 export를 해줘야 인식 된다.

또한 tsconfig.json에서 type이 들어갈 위치를 정의해줘야 한다.
```
"typeRoots": [
  "./types",
  "./node_modules/@types"
],     
```