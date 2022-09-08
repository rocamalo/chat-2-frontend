//returns the same object without the desired property
export function  deletePropertyFromObject( data: any, property: string) {
    const dataToModify = { ...data };
    for (const key in dataToModify) {
      if (key === property) {
        delete dataToModify[key];
      }
    }
    return dataToModify;
  }

  