CREATE TABLE Users
(
    UserId Numeric(18,0) IDENTITY(1,1) PRIMARY KEY,
    UserIdentity UNIQUEIDENTIFIER,
    FirstName Varchar(100),
    LastName Varchar(100),
    Email Varchar(100),
    HashPassword Varchar(MAX)
)