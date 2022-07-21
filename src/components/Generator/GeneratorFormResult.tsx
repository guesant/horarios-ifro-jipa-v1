import { useQuery } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import { useCallback, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { useDebounce } from "use-debounce";
import { fetchForumTopicPDFAttachmentLink } from "../../features/services/GradesScrapper/fetchForumTopicPDFAttachmentLink";
import { generateImageForClasses } from "../../features/services/ImageGenerator/generateImageForClasses";
import { getURLWithProxy } from "../../features/utils/getURLWithProxy";
import { useGeneratorFormFields } from "./useGeneratorFormFields";

type IHandleGenerateOptions = {
  pdfLink: string | undefined;
  selectedClass: string | null;
};

export const GeneratorFormResult = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [resultURL, setResultURL] = useState<string | null>(null);

  const { selectedClass, selectedForumTopic } = useGeneratorFormFields();

  const { data: pdfLink, isError: pdfLinkIsError } = useQuery(
    [selectedForumTopic, "pdfAttachmentLink"],
    async () => {
      if (!selectedForumTopic) {
        return undefined;
      }

      const pdfLink = await fetchForumTopicPDFAttachmentLink(
        getURLWithProxy(selectedForumTopic)
      );

      return pdfLink && getURLWithProxy(pdfLink);
    }
  );

  const [debouncedPDFLink] = useDebounce(pdfLink, 50);
  const [debouncedSelectedClass] = useDebounce(selectedClass, 50);

  const updateResult = useCallback(
    (blob: Blob | null) => {
      resultURL && URL.revokeObjectURL(resultURL);
      setResultURL(blob ? URL.createObjectURL(blob) : null);
    },
    [resultURL]
  );

  const handleGenerate = useCallback(
    async (options: IHandleGenerateOptions) => {
      setIsError(false);

      const { pdfLink, selectedClass } = options;

      if (selectedClass && pdfLink) {
        setIsLoading(true);

        try {
          const blob = await generateImageForClasses({ pdfLink }, [
            selectedClass,
          ]);
          updateResult(blob);
        } catch (error) {
          setIsError(true);
        }
      } else {
        updateResult(null);
      }

      setIsLoading(false);
    },
    []
  );

  const _isLoading = Boolean(
    isLoading ||
      pdfLink !== debouncedPDFLink ||
      selectedClass !== debouncedSelectedClass
  );

  const _isError = Boolean(pdfLinkIsError || isError);

  useEffect(() => {
    handleGenerate({
      pdfLink: debouncedPDFLink,
      selectedClass: debouncedSelectedClass,
    });
  }, [handleGenerate, debouncedPDFLink, debouncedSelectedClass]);

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

  if (_isLoading) {
    return (
      <>
        <section className="my-4">
          <h1>Resultado</h1>

          <Alert variant="info">Gerando imagem...</Alert>
        </section>
      </>
    );
  }

  if (_isError || !resultURL) {
    return (
      <>
        <section className="my-4">
          <h1>Resultado</h1>

          <Alert variant="alert">Não foi possível gerar a imagem.</Alert>
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
