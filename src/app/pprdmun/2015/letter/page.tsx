'use client'

import PageTransition from '@/components/PageTransition'
import PPRDInvitationLetter from '@/components/PPRDInvitationLetter'

export default function PPRDMUN2015LetterPage() {
  const content = `
    <p class="mb-6">尊敬的各校模联人及模联指导老师:</p>
    <p class="mb-6">展信佳!</p>
    <p class="mb-6">
      2015 年泛珠三角高中生模拟联合国大会兹定于 2015 年 7 月 14 日-17 日在深圳中学召开。在此，我们诚挚地邀请您参加本次会议。
    </p>
    <p class="mb-6">
      2015 年的泛珠模联意义特殊。今年，作为泛珠模联的承办方与泛珠地区率先成立的模联组织之一，深中模联恰历经十载春秋。十年间，从无到有，从小到大，深中模联不断于探索间迈步前行，始终在挑战中稳健发展，到如今已然建立起自主高效的管理机制。我们有幸与众模联人一同见证这一历程，同样也十分荣幸能够亲历泛珠地区模联发展和各模联组织成长的全过程。
    </p>
    <p class="mb-6">
      而泛珠三角高中生模拟联合国大会，正是深中模联与各位泛珠模联界同仁一道打造，共同品味的饕餮盛宴。自 2010 年始，泛珠模联承载着众模联人的活力与梦想，如今正要迎来她的五周岁生日。火红的凤凰花下，五度花开花谢、来去匆匆，不断有新的模联人在时代的孕育下茁壮成长，也有经验丰富的先驱者继续驰骋于模联舞台，为泛珠地区模联的持续发展贡献着自己愈发成熟的力量。
    </p>
    <p class="mb-6">
      回望过去的四年，泛珠模联从第一届的蹒跚学步到第四届的日趋成熟，每一次的成长都凝聚着无数模联人的智慧与心血。今年，第五届泛珠模联将以更加专业的姿态，更加严谨的学术标准，为各位模联人提供更加优质的会议体验。我们将在保持传统优势的基础上，不断推陈出新，力求为泛珠地区模联的发展贡献自己的力量。
    </p>
    <p class="mb-6">
      吾等联合国之子民，为更美好之世界而联合。
    </p>
    <div class="text-right mt-12">
      <p class="text-lg font-semibold">
        2015年泛珠三角高中生模拟联合国大会组委会
      </p>
    </div>
  `

  return (
    <PageTransition>
      <PPRDInvitationLetter 
        year={2015}
        content={content}
        backHref="/pprdmun/2015"
      />
    </PageTransition>
  )
}