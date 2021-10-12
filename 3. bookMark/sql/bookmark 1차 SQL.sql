
-- 유저 회원가입(회원가입시 트리거로 기본 카테고리 생성)
insert into user(email, password, name, birthday, phone) values("diqksk@naver.com", "123123", "박찬우", 19930309, "01095010199");

-- 유저 정보 획득
select * from user where email = "diqksk@naver.com";

-- delete from user where email="diqksk@naver.com";

-- 북마크 추가 
INSERT INTO bookmark(cid,title,url) VALUES(1,"시니어코딩 정보","https://quizi.co.kr");

-- 북마크 읽을시 readed 전환
UPDATE bookmark SET readed = 1 where bid = 2;

-- 내 전체 북마크 목록 보기 (to READ)
SELECT u.uid, c.cid, b.bid, c.name as category, b.title, b.url, b.regdate, b.keep, b.deleted, b.readed  
FROM 
	user u 
INNER JOIN 
	category c 
ON u.uid = c.uid 
INNER JOIN 
	bookmark b 
ON 
	c.cid = b.cid 
WHERE u.uid = 3 AND b.keep = 0 AND b.readed = 0;

-- 내 전체 북마크 목록 보기 (to STUDY)
SELECT u.uid, c.cid, b.bid, c.name as category, b.title, b.url, b.regdate, b.keep, b.deleted, b.readed  
FROM 
	user u 
INNER JOIN 
	category c 
ON u.uid = c.uid 
INNER JOIN 
	bookmark b 
ON 
	c.cid = b.cid 
WHERE u.uid = 3 AND b.keep = 1;

-- 특정 카테고리의 북마크 목록 보기 (to READ)
SELECT u.uid, c.cid, b.bid, c.name as category, b.title, b.url, b.regdate, b.keep, b.deleted, b.readed  
FROM 
	user u 
INNER JOIN 
	category c 
ON u.uid = c.uid 
INNER JOIN 
	bookmark b 
ON 
	c.cid = b.cid 
WHERE u.uid = 3 AND c.cid = 1 AND b.keep = 0 AND b.readed = 0;

-- 특정 카테고리의 북마크 목록 보기 (to STUDY)
SELECT u.uid, c.cid, b.bid, c.name as category, b.title, b.url, b.regdate, b.keep, b.deleted, b.readed  
FROM 
	user u 
INNER JOIN 
	category c 
ON u.uid = c.uid 
INNER JOIN 
	bookmark b 
ON 
	c.cid = b.cid 
WHERE u.uid = 3 AND c.cid = 1 AND  b.keep = 1;

-- 전체 카테고리별 북마크 목록 보기(to READ)
SELECT u.uid, c.cid, b.bid, c.name as category, b.title, b.url, b.regdate, b.keep, b.deleted, b.readed  
FROM 
	user u 
INNER JOIN 
	category c 
ON u.uid = c.uid 
INNER JOIN 
	bookmark b 
ON 
	c.cid = b.cid 
WHERE u.uid = 3  AND b.keep = 0 AND b.readed = 0 ORDER BY cid, regdate;

-- 전체 카테고리별 목록 보기(to STUDY)
SELECT u.uid, c.cid, b.bid, c.name as category, b.title, b.url, b.regdate, b.keep, b.deleted, b.readed  
FROM 
	user u 
INNER JOIN 
	category c 
ON u.uid = c.uid 
INNER JOIN 
	bookmark b 
ON 
	c.cid = b.cid 
WHERE u.uid = 3  AND b.keep = 1 ORDER BY cid, bid;

-- 내 북마크 휴지통 보기 (keep하지 않고 이미 봐버렸지만 살리고싶은것들)
SELECT u.uid, c.cid, b.bid, c.name as category, b.title, b.url, b.regdate, b.keep, b.deleted, b.readed  
FROM 
	user u 
INNER JOIN 
	category c 
ON u.uid = c.uid 
INNER JOIN 
	bookmark b 
ON 
	c.cid = b.cid 
WHERE u.uid = 3 AND keep = 0 AND readed = 1;

-- 휴지통에서 꺼내기
UPDATE bookmark SET readed = 0 WHERE bid = 2;

-- 영구보관(to Study)로 하기
UPDATE bookmark SET keep = 1 WHERE bid = 2;

-- 카테고리명 수정
UPDATE category SET name = "수정이름" WHERE cid = 1;

-- 카테고리 삭제(트리거로 글은 유효)
DELETE FROM category WHERE cid = 2;

-- 카테고리 생성
INSERT INTO category(uid,name) VALUES(3,"새카테고리");

-- 북마크 카테고리 이동
UPDATE bookmark SET cid = 2 WHERE bid = 3;

-- 북마크 삭제
UPDATE bookmark SET deleted = 1 WHERE bid = 1;

 

