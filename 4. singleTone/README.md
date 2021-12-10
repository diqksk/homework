# Singletone Pattern

# 설명


- Singletone pattern이란 객체가 오직 하나의 인스턴스만 생성하는 패턴을 의미한다.
- 싱글톤 패턴을 사용하는 이유는 첫째 매모리 측면의 이득을 가질 수 있기 때문이다.
- 객체를 새로 생성하지 않고 이미 생성된 인스턴스를 활용하니 속도면으로도 이득을 볼 수 있다.
- 싱글톤 패턴을 이용하면 메모리를 효율적으로 사용할 수 있으나 하나의 인스턴스를 전역으로 공유하기 때문에 동시성 문제에 유의해야 한다.
- Node의 module은 기본적으로 singleton패턴을 이용해 export되고 import된다.

# 작동


### index.js
![image](https://user-images.githubusercontent.com/77711238/145592969-20c864e1-3f1f-43a5-ab35-511b36e8bf3d.png)

### a.js
![image](https://user-images.githubusercontent.com/77711238/145593133-2e9f000e-3c1a-4148-b1ba-7ad09e47d24e.png)

### b.js
![image](https://user-images.githubusercontent.com/77711238/145593224-19a4702a-ef8b-41f3-b2a4-8ad1b9d17bf7.png)

### index의 실행 결과값
![image](https://user-images.githubusercontent.com/77711238/145593362-af0c9579-322d-47b7-936f-08d90c27aaa1.png)

1. index.js를 실행시킨다면, 최초에 b.js의 로직이 수행될 것이다. 
2. b.js는 a.js를 require하므로 a.js가 실행될 것이다. 
3. a.js는 하나의 객체를 생성해 export하고있다. 
4. b.js에서는 새로 생성된 A인스턴스를 가지고있다. (초기값 0)
5. b.js는 받은 인스턴스의 초기값을 수정한 후 자신을 요청한 index.js로 넘겨준다.
6. index.js에서 b.js의 import가 종료된 후 a.js를 실행시킨다.
7. 만약 이때 a.js가 실행되어 새로운 객체를 반납한다면, b.js를 반환한 const b와는 별개의 객체일 것이다. (a: 0, b:1)
8. 하지만 index.js에서 변수 a의 값을 확인해본 결과 1이 나오는것을 확인할 수 있다.
9. 이로서 a모듈에서 반납한 인스턴스를 싱글톤으로 사용하고 있다는 것을 알 수 있다.
