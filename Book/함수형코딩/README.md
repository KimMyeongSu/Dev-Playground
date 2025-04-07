# 쏙쏙 들어오는 함수형 코딩 1~3장

## 1장: 함수형 프로그래밍 기본 개념

### 순수 함수(Pure Function)

- 동일 입력 → 항상 동일 출력
- 외부 상태 변경 없음
- 예: `function add(a, b) { return a + b; }`

### 부수 효과(Side Effect)

- 함수가 반환값 외에 시스템 상태를 변경하는 모든 동작
- 예: 전역 변수 수정, 파일 조작, DB 변경, 네트워크 요청

### 불변성(Immutability)

- 데이터 수정 대신 새로운 데이터 생성
- 장점: 예측 가능한 코드, 멀티스레드 안전, 디버깅 용이

### 함수형 프로그래밍 장점

- 테스트 용이성: 순수 함수는 입출력만 검증
- 버그 감소: 상태 변화 최소화로 예측 가능성 향상
- 재사용성: 작은 함수 조합으로 복잡한 기능 구현
- 병렬 처리 적합: 독립적 실행 가능

## 2장: 액션, 계산, 데이터

### 액션(Action)

- 실행 시점/횟수에 영향 받는 코드
- 특징: 결과 변동성, 부수 효과 발생
- 예: API 호출, DB 쿼리, 사용자 입력, 파일 I/O

### 계산(Calculation)

- 순수 함수로 구현된 코드
- 특징: 동일 입력→동일 출력, 부수 효과 없음
- 예: 수학 연산, 문자열 처리, 배열 변환

### 데이터(Data)

- 정적 정보
- 특징: 그 자체로는 동작하지 않음, 직렬화 가능
- 예: JSON, 배열, 원시값(숫자, 문자열)

### 함수형 설계 핵심 원칙

- 액션 최소화 및 격리
- 계산과 데이터 중심으로 프로그램 구성
- 의존성 방향: 액션 → 계산 → 데이터

## 3장: 일급 함수와 고차 함수

### 일급 함수(First-class Function)

- 함수를 값처럼 다룰 수 있는 개념
- 특징: 변수 할당, 자료구조 저장, 함수 인자/반환값 사용

```javascript
// 함수를 변수에 할당
const double = function (x) {
  return x * 2
}

// 함수를 배열에 저장
const operations = [
  function (x) {
    return x + 1
  },
  function (x) {
    return x * 2
  },
]
```

### 고차 함수(Higher-order Function)

- 함수를 인자로 받거나 함수를 반환하는 함수

```javascript
// 함수를 인자로 받는 고차 함수
function map(array, transform) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    result[i] = transform(array[i])
  }
  return result
}

// 함수를 반환하는 고차 함수
function multiplier(factor) {
  return function (x) {
    return x * factor
  }
}

const double = multiplier(2)
const triple = multiplier(3)
...
```
