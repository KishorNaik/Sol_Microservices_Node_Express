CREATE TABLE tblUserPosts
(
    PostId Numeric(18,0) IDENTITY(1,1) PRIMARY KEY,
    PostIdentity UNIQUEIDENTIFIER,
    Post Varchar(MAX),
    UserIdentity UNIQUEIDENTIFIER
)