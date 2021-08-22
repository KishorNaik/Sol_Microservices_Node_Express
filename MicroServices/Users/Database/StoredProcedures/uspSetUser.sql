CREATE PROCEDURE uspSetUser
(
    @Command Varchar(100),

    @UserIdentity UNIQUEIDENTIFIER,


    @FirstName Varchar(50),
    @LastName Varchar(50),

    @Email Varchar(100),
    @HashPassword Varchar(MAX)
)
AS 

        DECLARE @ErrorMessage Varchar(MAX);

        IF @Command='Register-User'
            BEGIN

                BEGIN TRY
                    BEGIN TRANSACTION

                        INSERT INTO tblUsers
                        (
                            UserIdentity,
                            FirstName,
                            LastName,
                            Email,
                            HashPassword
                        )
                        VALUES
                        (
                            NEWID(),
                            @FirstName,
                            @LastName,
                            @Email,
                            @HashPassword
                        )

                    COMMIT TRANSACTION
                END TRY 

                BEGIN CATCH 
                    SET @ErrorMessage=ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage,16,1);
                        ROLLBACK TRANSACTION
                END CATCH

            END
        
        IF @Command='Update-User'
            BEGIN

                BEGIN TRY
                    BEGIN TRANSACTION

                       UPDATE tblUsers
                            SET 
                                FirstName=@FirstName,
                                LastName=@LastName,
                                Email=@Email,
                                HashPassword=@HashPassword
                            WHERE   
                                UserIdentity=@UserIdentity


                    COMMIT TRANSACTION
                END TRY 

                BEGIN CATCH 
                    SET @ErrorMessage=ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage,16,1);
                        ROLLBACK TRANSACTION
                END CATCH

            END
        IF @Command='Remove-User'
            BEGIN

                BEGIN TRY
                    BEGIN TRANSACTION

                       DELETE FROM tblUsers WHERE UserIdentity=@UserIdentity

                    COMMIT TRANSACTION
                END TRY 

                BEGIN CATCH 
                    SET @ErrorMessage=ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage,16,1);
                        ROLLBACK TRANSACTION
                END CATCH

            END

GO