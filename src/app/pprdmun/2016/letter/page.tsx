'use client'

import PageTransition from '@/components/PageTransition'
import PPRDInvitationLetter from '@/components/PPRDInvitationLetter'

export default function PPRDMUN2016LetterPage() {
  const content = `
    <p class="mb-6">尊敬的友校模联组织及模联同仁：</p>
    <p class="mb-6">展信佳！</p>
    <p class="mb-6">
      2016年泛珠三角高中生模拟联合国大会兹定于2016年7月19至22日在深圳中学召开。在此，我们诚挚地邀请您参与本次会议。
    </p>
    <p class="mb-6">
      二零一六年是不平凡的一年，作为泛珠三角高中生模拟联合国大会的承办方与泛珠地区率先成立的模联组织之一，深圳中学模拟联合国协会已走过十一载春秋。在一代代泛珠模联人的辛勤浇灌、不懈培育之下，学术之枝蔓欣欣向荣，枝头花蕾含苞待放；时间转化为养料，滋养了幼小的嫩芽，也见证了许许多多在树下驻足的泛珠模联人。
    </p>
    <p class="mb-6">
      六载风雨砥砺，六载春华秋实。身为模联人，我们始终怀揣着对世界的热忱，这热忱源于对独立和自由的向往和对过往与未来的好奇。因为我们始终肩负着公民之责任，怀着青年之使命，所以我们不曾放弃。我们格物致知，上下求索，寻找着世界的范式。过去的六年中，我们不断提升自己，革故鼎新，秉承学术本位的理念，齐心协力，锐意进取。
    </p>
    <p class="mb-6">
      延续过往六年的泛珠模联筹办理念，我们审视自身，革旧立新。面对复杂的局势，泛珠模联人直面挑战，把握机遇。世界政治中的纵横捭阖，国际局势已然呈现诡谲之态。站在历史的高点，我们凝视着每一个事实背后的可能。
    </p>
    <p class="mb-6">
      感谢一路上一直以来关注和支持泛珠三角模拟联合国大会的各位同仁，您的赞许与支持是我们前进的动力，您的批评与建议是我们鞭策自己变得更好的动力。六载携手并进，伫立于历史的巍峨高山，我们更需敢于发声，敢于革新。大会组委会将秉持初心，在波澜中稳步前进，在动荡中横刀立马。在时代的浮沉中我们期待与敢于变革、敢于创新的各位同仁同历冷暖，共同奏响泛珠模联的又一华章！
    </p>
    <p class="mb-6">
      吾等联合国之子民，为更美好之世界而联合。
    </p>
    <div class="text-right mt-12">
      <p class="text-lg font-semibold">
        2016年泛珠三角高中生模拟联合国大会组委会
      </p>
    </div>
  `

  return (
    <PageTransition>
      <PPRDInvitationLetter 
        year={2016}
        content={content}
        backHref="/pprdmun/2016"
      />
    </PageTransition>
  )
}