import React from "react";
import ImageUpload from "@/components/custom_ui/image-upload";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  return (
    <>
      <ImageUpload />

      <Button
        asChild
        style={{ alignSelf: "center", marginTop: "2rem" }}
        className="max-w-[8rem]"
        variant={"default"}
      >
        <Link href={`/dashboard/${userId}`}>Submit</Link>
      </Button>
    </>
  );
};

export default page;
