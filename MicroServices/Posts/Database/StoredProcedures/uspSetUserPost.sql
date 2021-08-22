CREATE PROCEDURE uspSetUserPost
(
    @Command Varchar(100),

    @PostIdentity UNIQUEIDENTIFIER,
    @Post Varchar(MAX),

    @UserIdentity UNIQUEIDENTIFIER
)
AS 

        DECLARE @ErrorMessage Varchar(MAX);

        IF @Command='Create-Post'
            BEGIN

                BEGIN TRY
                    BEGIN TRANSACTION

                        INSERT INTO tblUserPosts
                        (
                            PostIdentity,
                            Post,
                            UserIdentity
                        )
                        VALUES
                        (
                            NEWID(),
                            @Post,
                            @UserIdentity
                        )

                    COMMIT TRANSACTION
                END TRY 

                BEGIN CATCH 
                    SET @ErrorMessage=ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage,16,1);
                        ROLLBACK TRANSACTION
                END CATCH

            END
        
        IF @Command='Update-Post'
            BEGIN

                BEGIN TRY
                    BEGIN TRANSACTION

                        UPDATE tblUserPosts 
                            SET Post=@Post
                            WHERE PostIdentity=@PostIdentity


                    COMMIT TRANSACTION
                END TRY 

                BEGIN CATCH 
                    SET @ErrorMessage=ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage,16,1);
                        ROLLBACK TRANSACTION
                END CATCH

            END
        IF @Command='Remove-Post'
            BEGIN

                BEGIN TRY
                    BEGIN TRANSACTION

                        DELETE FROM tblUserPosts WHERE PostIdentity=@PostIdentity
                    COMMIT TRANSACTION
                END TRY 

                BEGIN CATCH 
                    SET @ErrorMessage=ERROR_MESSAGE();
                        RAISERROR(@ErrorMessage,16,1);
                        ROLLBACK TRANSACTION
                END CATCH

            END

GO