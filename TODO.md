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
