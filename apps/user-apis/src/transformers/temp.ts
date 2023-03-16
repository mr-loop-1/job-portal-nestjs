// export class UserTransformer extends Transformer {
//   public availableIncludes = [
//     'certificates',
//     'agentInfo',
//     'roles',
//     'address',
//     'localities',
//   ];
//   async transform(user: IUserModel): Promise<IUserModel> {
//     return {
//       id: user.id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       kycMobileNumber: user.kycMobileNumber,
//       contactMobileNumber: user.contactMobileNumber,
//       profilePictureSlug: Storage.generateSignedUrl(user.profilePictureSlug),
//       status: user.status,
//       tncAgreed: user.tncAgreed,
//       gender: user.gender,
//       isKycDone: user.isKycDone,
//       orgType: user.orgType,
//       dob: user.dob,
//       isPreferenceSet: user.isPreferenceSet,
//       isMobileVerified: user.isMobileVerified,
//       isNewUser: user.isNewUser,
//       token: user.token,
//       address: user.address,
//       promotionalNotificationPreference: user.promotionalNotificationPreference,
//       meta: user.meta,
//       name: user.name, //extra key for karza kyc
//       createdAt: user.createdAt,
//       isblocked: user.isblocked,
//     };
//   }
//   async includeAgentInfo(model: IUserModel): Promise<Record<string, any>> {
//     if (!model.agentInfo) {
//       await model?.$load({ agentInfo: true });
//     }
//     return await this.item(model.agentInfo, new AgentTransformer(), {
//       include: ['business', 'company', 'certificates'],
//     });
//   }
//   async includeRoles(model: IUserModel): Promise<IRoleModel[]> {
//     await model.$load({ roles: true });
//     return await this.collection(model.roles, new RoleTransformer());
//   }
//   async includeAddress(model: IUserModel): Promise<IAddressModel> {
//     await model.$load({ address: true });
//     return await this.item(model.address, new AddressTransformer(), {
//       include: ['district', 'country'],
//     });
//   }
//   async includeLocalities(model: IUserModel): Promise<ILocalityModel[]> {
//     await model.$load({ localities: true });
//     return await this.collection(model.localities, new LocalityTransformer());
//   }
// }
