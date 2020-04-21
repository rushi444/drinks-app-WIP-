# Migration `20200421092630-test1`

This migration has been generated by rushi444 at 4/21/2020, 9:26:30 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
    "email" text  NOT NULL ,
    "id" SERIAL,
    "name" text   ,
    "password" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Recipe" (
    "createdOn" timestamp(3)  NOT NULL ,
    "id" SERIAL,
    "imageUrl" text   ,
    "name" text  NOT NULL ,
    "userId" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Like" (
    "id" SERIAL,
    "recipeId" integer  NOT NULL ,
    "userId" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Comment" (
    "id" SERIAL,
    "recipeId" integer  NOT NULL ,
    "text" text  NOT NULL ,
    "userId" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."Ingredient" (
    "amount" text  NOT NULL ,
    "id" SERIAL,
    "name" text  NOT NULL ,
    "recipeId" integer  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE UNIQUE INDEX "User.email" ON "public"."User"("email")

ALTER TABLE "public"."Recipe" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Like" ADD FOREIGN KEY ("recipeId")REFERENCES "public"."Recipe"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("recipeId")REFERENCES "public"."Recipe"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "public"."Ingredient" ADD FOREIGN KEY ("recipeId")REFERENCES "public"."Recipe"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200421092630-test1
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,57 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model User {
+  id Int @default(autoincrement()) @id
+  email String @unique
+  name String?
+  password String
+  recipes Recipe[]
+  comments Comment[]
+  likedRecipes Like[]
+}
+
+model Recipe {
+  id Int @default(autoincrement()) @id
+  imageUrl String?
+  name String
+  comments Comment[]
+  ingredients Ingredient[]
+  userId Int
+  createdBy User @relation(fields: [userId], references: [id])
+  createdOn DateTime 
+}
+
+model Like {
+id Int @default(autoincrement()) @id
+userId Int
+likedBy User @relation(fields: [userId], references: [id])
+recipeId Int
+recipe Recipe @relation(fields: [recipeId], references: [id])
+}
+
+model Comment {
+  id Int @default(autoincrement()) @id
+  text String
+  userId Int
+  createdBy User @relation(fields: [userId], references: [id])
+  recipeId Int
+  recipe Recipe @relation(fields: [recipeId], references: [id])
+}
+
+model Ingredient {
+  id Int @default(autoincrement()) @id
+  amount String
+  name String
+  recipeId Int
+  recipe Recipe @relation(fields: [recipeId], references: [id])
+}
```

