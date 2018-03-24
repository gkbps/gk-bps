Nếu muốn giữ style css chuyển từ dạng
As is: <component inputs></component>
To be: <tag component inputs></component>

Put all API into ngrx store as well and under the name apiUser

Nguyen tac

Request = requestHeader + requestBody + requestFooter

requestHeader = General + Approval
Table: request

requestBody = Gkcln, Gksol, ...
Table: clientRequest, solutionRequest ...

requestFooter = Documents + Comments
Table: documentRequest, commentRequest

Gkcln31: Yêu cầu tạo 1 client mới
Branches
Gkcln31: Tạo mới (NEW)
Gkcln31/:id: Xử lý trên request tạo mới (DRAFT -> POSTED)



Gkcln33: Yêu cầu sửa 1 client hiện hữu
Branches
Gkcln33: Chọn 1 client id để lấy dữ liệu sửa đổi
Gkcln33/:id: Xử lý trên request sửa 1 client hiện hữu (DRAFT -> POSTED)

    "webpack": "^3.10.0",
