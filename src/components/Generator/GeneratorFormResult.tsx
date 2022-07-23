import { useQuery } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import { useCallback, useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useContextSelector } from "use-context-selector";
import { useDebounce } from "use-debounce";
import { getURLWithProxy } from "../../features/utils/getURLWithProxy";
import { cachedFetchForumTopicPDFAttachmentLink } from "../../features/services/GradesScrapper/cachedFetchForumTopicPDFAttachmentLink";
import { cachedGenerateImageForClasses } from "../../features/services/GradesScrapper/cachedGenerateImageForClasses";
import { GeneratorFormContext } from "./GeneratorFormContext";
import { useGeneratorFormField } from "./useGeneratorFormField";

type IHandleGenerateOptions = {
  pdfLink: string | null | undefined;
  selectedClass: string | null;
};

export const GeneratorFormResult = () => {
  const [isHandleGenerateError, setHandleGenerateIsError] = useState(false);
  const [isHandleGenerateLoading, setIsHandleGenerateLoading] = useState(false);

  const [resultURL, setResultURL] = useState<string | null>(null);

  const selectedForumTopic = useGeneratorFormField("forumTopic");

  const resultImgElRef = useRef<HTMLImageElement>(null);

  const gradesQueryIsLoading = useContextSelector(
    GeneratorFormContext,
    ({ gradesQuery: { isLoading } }) => isLoading
  );

  const gradesQueryIsError = useContextSelector(
    GeneratorFormContext,
    ({ gradesQuery: { isError } }) => isError
  );

  const targetCourseYearClass = useContextSelector(
    GeneratorFormContext,
    ({ targetCourseYearClass }) => targetCourseYearClass
  );

  const selectedClass = targetCourseYearClass?.id ?? null;

  const pdfLinkQuery = useQuery(
    [selectedForumTopic, "pdfAttachmentLink"],
    async () => {
      if (!selectedForumTopic) {
        return undefined;
      }

      const pdfLink = await cachedFetchForumTopicPDFAttachmentLink(
        getURLWithProxy(selectedForumTopic)
      );

      return pdfLink && getURLWithProxy(pdfLink);
    }
  );

  const { data: pdfLink } = pdfLinkQuery;

  const [debouncedPDFLink] = useDebounce(pdfLink, 5);
  const [debouncedSelectedClass] = useDebounce(selectedClass, 5);

  const updateResultBlob = useCallback((resultBlob: Blob | null) => {
    setResultURL((resultURL) => {
      if (resultURL) {
        URL.revokeObjectURL(resultURL);
      }
      return resultBlob && URL.createObjectURL(resultBlob);
    });
  }, []);

  const handleGenerate = useCallback(
    async (options: IHandleGenerateOptions) => {
      setHandleGenerateIsError(false);

      const { pdfLink, selectedClass } = options;

      if (selectedClass && pdfLink) {
        setIsHandleGenerateLoading(true);

        try {
          const blob = await cachedGenerateImageForClasses(
            pdfLink,
            selectedClass
          );

          updateResultBlob(blob);
        } catch (error) {
          setHandleGenerateIsError(true);
        }
      } else {
        updateResultBlob(null);
      }

      setIsHandleGenerateLoading(false);
    },
    [updateResultBlob]
  );

  const isLoading = Boolean(
    pdfLinkQuery.isLoading ||
      gradesQueryIsLoading ||
      isHandleGenerateLoading ||
      pdfLink !== debouncedPDFLink ||
      selectedClass !== debouncedSelectedClass
  );

  const isError = Boolean(
    pdfLinkQuery.isError || gradesQueryIsError || isHandleGenerateError
  );

  useEffect(() => {
    handleGenerate({
      pdfLink: debouncedPDFLink,
      selectedClass: debouncedSelectedClass,
    });
  }, [handleGenerate, debouncedPDFLink, debouncedSelectedClass]);

  useEffect(() => {
    const resultImgEl = resultImgElRef.current;

    if (resultImgEl && resultURL) {
      resultImgEl.scrollIntoView({ block: "center" });
    }
  }, [resultImgElRef, resultURL]);

  if (!selectedClass) {
    return (
      <>
        <section className="my-4">
          <h1>Resultado</h1>
          <Alert variant="warning">Selecione a sua turma.</Alert>
        </section>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <section className="my-4">
          <h1>Resultado</h1>

          <Alert variant="info">Gerando imagem...</Alert>
        </section>
      </>
    );
  }

  if (isError || !resultURL) {
    return (
      <>
        <section className="my-4">
          <h1>Resultado</h1>

          <Alert variant="danger">Não foi possível gerar a imagem.</Alert>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="my-4">
        <h1>Resultado</h1>

        <div>
          <div>
            <Button
              variant="primary"
              onClick={() => saveAs(resultURL, `horario-${selectedClass}.png`)}
            >
              Baixar Imagem
            </Button>

            <span className="px-1"></span>

            <Button as="a" variant="secondary" href={resultURL} target="_blank">
              Abrir Em Nova Guia
            </Button>
          </div>

          <div className="py-2"></div>

          <div>
            <a href={resultURL}>
              <img
                src={resultURL}
                ref={resultImgElRef}
                style={{ height: "300px" }}
                alt="Visualização da imagem gerada."
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
