import { useMutation } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api/client";
import { ContactPayload } from "@/lib/types/contact";

const submitContact = (body: ContactPayload) => {
  return apiFetch<void>("/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
  });
};

const useSubmitContact = () => {
  return useMutation({
    mutationFn: (body: ContactPayload) => submitContact(body),
  });
};

export { submitContact, useSubmitContact };
