export const addClassToElement = (
  objDocumentP,
  sNodeSource,
  sNodeTarget,
  isRemove
) => {
  const objDocument = objDocumentP ? objDocumentP : document;
  let $bodyEle =
    objDocument && objDocument.querySelector
      ? objDocument.querySelector(sNodeSource)
      : null;
  if ($bodyEle && $bodyEle.classList) {
    if (!$bodyEle.classList.contains(sNodeTarget)) {
      $bodyEle.classList.add(sNodeTarget);
    }
    if (isRemove) {
      $bodyEle.classList.remove(sNodeTarget);
    }
  }
};
