// import { hashPassword } from '@/lib/bcrypt';
// import { generateRefferalCode } from '@/lib/generateRefferalCode';
// import prisma from '@/prisma';
// import { IUser } from '@/types/user.type';

// interface IRegister
//   extends Pick<
//     IUser,
//     'username' | 'email' | 'password' | 'role' | 'refferal_code'
//   > {
//   reff?: string;
// }

// export const registerService = async (body: IRegister) => {
//   try {
//     const { username, email, password, role, refferal_code, reff } = body;

//     if (!username || !email || !password) throw new Error('Fields required!');

//     const userExist = await prisma.user.findFirst({
//       where: {
//         email: email,
//       },
//     });

//     if (userExist) throw new Error('Email or user already exist!');

//     const hashedPassword = await hashPassword(password);

//     // generate refferal code for user
//     const { code } = generateRefferalCode();

//     // sql transactions to make user, generate refferal code, points and refferal history
//     const newUser = await prisma.$transaction(async (tx) => {
//       const user = await tx.user.create({
//         data: {
//           username: username,
//           email: email,
//           password: hashedPassword,
//           refferal: code,
//           role: 'CUSTOMER',
//         },
//       });

//       const defaultPoint = 0;
//       const refferalPoint = 10000;
//       const pointExpiredDate = new Date();
//       pointExpiredDate.setMonth(pointExpiredDate.getMonth() + 3);

//       if (reff) {
//         const refferalOwner = await tx.user.findFirst({
//           where: {
//             refferal: reff,
//           },
//         });
//         console.log(refferalOwner);

//         if (!refferalOwner) throw new Error('Not found!');

//         if (refferalOwner) {
//           await tx.point.updateMany({
//             where: { userId: refferalOwner.id },
//             data: {
//               total: {
//                 increment: refferalPoint,
//               },
//               expiredAt: pointExpiredDate,
//             },
//           });
//         }

//         const discountRate = 10;
//         await tx.reward.create({
//           data: {
//             userId: user.id,
//             discount_rate: discountRate / 100,
//             expiredAt: pointExpiredDate,
//           },
//         });
//       }

//       await tx.point.create({
//         data: {
//           userId: user.id,
//           total: defaultPoint,
//           expiredAt: pointExpiredDate,
//         },
//       });

//       return user;
//     });

//     return {
//       message: 'register success',
//       data: newUser,
//     };
//   } catch (error) {
//     throw error;
//   }
// };
