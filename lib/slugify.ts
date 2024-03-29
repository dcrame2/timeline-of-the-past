function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function slugifyNames(
  firstName: string,
  middleName: string,
  lastName: string
) {
  const slugifiedFirstName = slugify(firstName);
  const slugifiedMiddleName = slugify(middleName);
  const slugifiedLastName = slugify(lastName);

  const slug =
    `${slugifiedFirstName}-${slugifiedMiddleName}-${slugifiedLastName}`.replace(
      /-+/g,
      "-"
    );

  return `/${slug}`;
}
