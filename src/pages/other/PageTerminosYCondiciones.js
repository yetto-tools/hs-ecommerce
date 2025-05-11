
import { useSelector } from "react-redux";
import MarkdownRenderer from "./MarkdownRenderer";
import PageContentBlank from "./PageContentBlank";
import { useEffect, useState } from "react";
import { TERMS_AND_CONDITIONS_MD_PATH } from "../../config";



export const PageTerminosYCondiciones = () => {

const [markdown, setMarkdown] = useState("");

useEffect(() => {
  const fetchMarkdown = async () => {
    const path = TERMS_AND_CONDITIONS_MD_PATH || "/docs/terminos-condiciones.md";
    const response = await fetch(path);
    const text = await response.text();
    setMarkdown(text);
  };

  fetchMarkdown();
}, []);

    return (
        <PageContentBlank>
            <MarkdownRenderer  content={markdown} />
        </PageContentBlank>
    )
}

export default PageTerminosYCondiciones;