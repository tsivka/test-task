export async function attempt(
    available: Array<number>,
    allowed: Array<number|string>,
    preferred: Array<number|string>
): Promise<Array<number>> {

  if (available.length == 0) {
    throw new Error('zero available')
  }
  if (allowed.includes('any')) {
    allowed= normalizeArrayToNumeric(allowed);
    allowed = [...available]
  }
  if (preferred.includes('any')) {
    preferred= normalizeArrayToNumeric(preferred);
    preferred = [...allowed]
  }

  let arr = [available,allowed,preferred];
  let result: any = getSimilarFromArrays(arr);
  if (result.length == 0) {
    arr = [available, allowed];
    result = getSimilarFromArrays(arr);
    result = result.length ? [result.pop()] : [];
  }
  return result;
 }

 function normalizeArrayToNumeric( inut: Array<number|string>): Array<number>{
   return inut.map(Number);
 }
 function getSimilarFromArrays(arrays: Array<Array<number|string>>) {
   return arrays.reduce((p,c) => p.filter(e => c.includes(e)));
 }