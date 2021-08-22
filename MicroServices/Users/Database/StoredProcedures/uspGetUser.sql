Create PROCEDURE uspGetUser
(
    @Command Varchar(100),

    @Email Varchar(100)
)
AS 

        DECLARE @ErrorMessage Varchar(MAX);

        IF @Command='Auth'
            BEGIN

                BEGIN TRY
                    BEGIN TRANSACTION

                      SELECT 
                        U.UserIdentity,
                        U.FirstName,
                        U.LastName,
                        U.Email,
                        U.HashPassword
                      FROM
                        tblUsers As U WITH(NOLOCK)
                      WHERE
                        U.Email=@Email


                    COMMIT TRANSACTION
                END TRY 

                BEGIN CATCH 
                    SET @ErrorMessage=ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage,16,1);
                        ROLLBACK TRANSACTION
                END CATCH

            END
GO