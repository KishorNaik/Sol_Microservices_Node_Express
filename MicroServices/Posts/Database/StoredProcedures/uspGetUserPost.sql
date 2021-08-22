Create PROCEDURE uspGetUserPost
(
    @Command Varchar(100),

    @UserIdentity UNIQUEIDENTIFIER,

    @PageNumber bigint,
    @RowsOfPageNumber bigint
)
AS 

        DECLARE @ErrorMessage Varchar(MAX);

        IF @Command='Get-User-Post'
            BEGIN

                BEGIN TRY
                    BEGIN TRANSACTION

                        SELECT
                            P.PostIdentity,
                            P.Post
                        FROM 
                            tblUserPosts as P WITH(NOLOCK)
                        WHERE
                            P.UserIdentity=@UserIdentity
                        ORDER BY P.PostId
                        
                        OFFSET (@PageNumber-1)*@RowsOfPageNumber ROWS
                        FETCH NEXT @RowsOfPageNumber ROWS ONLY

                    COMMIT TRANSACTION
                END TRY 

                BEGIN CATCH 
                    SET @ErrorMessage=ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage,16,1);
                        ROLLBACK TRANSACTION
                END CATCH

            END
GO