# todoリスト

* todoテーブルに"api/source/test.csv"のデータを用意する

## ユーザはtodoリストのタイトルを見ることができる
* apiの"/v1/todo"にGetリクエストを投げる
* レスポンスのJsonの"todoList.0.title"が"タイトル1"となる
* レスポンスのJsonの"todoList.1.title"が"タイトル2"となる
* レスポンスのJsonの"todoList.2.title"が"タイトル3"となる

## ユーザはtodoリストのcheckの状態を見ることができる
* apiの"/v1/todo"にGetリクエストを投げる
* レスポンスのJsonの"todoList.0.checked"がBooleanの"true"となる
* レスポンスのJsonの"todoList.1.checked"がBooleanの"false"となる
* レスポンスのJsonの"todoList.2.checked"がBooleanの"true"となる

## ユーザはtodoリストをチェックできる
* apiの"/v1/todo/2"にbody"{\"checked\": true}"でPatchリクエストを投げる
* レスポンスのJsonの"checked"がBooleanの"true"となる

## ユーザはtodoリストを追加できる
* apiの"/v1/todo"にbody"{\"title\": \"タイトル\"}"でPostリクエストを投げる
* レスポンスのJsonの"title"が"タイトル"となる
* レスポンスのJsonの"checked"がBooleanの"false"となる
