export default function (initialState: any) {
  // console.log('initialState', initialState)

  return {
    canReadFoo: () => false,
    ...initialState,
    // canUpdateFoo: role === 'admin',
    // canDeleteFoo: foo => {
    //   return foo.ownerId === userId;
    // },
  };
}
