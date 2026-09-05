/**
 * Renders schema.org JSON-LD. Accepts one or many objects.
 * The JSON is escaped to prevent `</script>` injection from content strings.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
