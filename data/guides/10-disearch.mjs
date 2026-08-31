// DI SEARCH 連携ガイド。ユーザーからの「パスワード登録はどのように?」という
// 問い合わせ(2026-08-30)が起点。「自分の DI SEARCH アカウントを入れる」が核心。
export default {
  slug: 'disearch',
  title: 'DI SEARCH と連携する',
  description: 'DI SEARCH のアカウントを登録して、書籍検索と関連指導を使えるようにする手順',
  lead: 'DI SEARCH のアカウントを THE GOSHO に登録すると、「書籍検索」タブで池田先生の著作や指導を探せるほか、御書の現代語訳から「関連指導」を読めるようになります。登録は 3 ステップです。',
  note: {
    title: 'はじめにご確認ください',
    html: '連携には <strong>お客様ご自身の DI SEARCH アカウント</strong>（<a href="https://www.sokadisearch.org/" target="_blank" rel="noopener">sokadisearch.org</a> でお使いのメールアドレスとパスワード）が必要です。THE GOSHO 側で新しくパスワードを作るものではありません。DI SEARCH のアカウントをお持ちでない場合は、先に DI SEARCH のサイトでご登録ください。',
  },
  steps: [
    {
      title: '「その他」から DI SEARCH を開く',
      items: [
        'ホーム画面の右上にある丸いアイコンをタップして「その他」を開きます。',
        '下にスクロールすると <strong>連携</strong> という見出しがあります。',
        'その中の <strong>DI SEARCH</strong>（未接続と表示されています）をタップします。',
      ],
      img: 'disearch-1-more.jpg',
      alt: '「その他」画面。連携の見出しの下に DI SEARCH の項目がある',
      caption: '「その他」画面。下のほうにある「連携 → DI SEARCH」をタップします。',
    },
    {
      title: 'メールアドレスとパスワードを入力する',
      items: [
        '<strong>メールアドレス</strong>に、DI SEARCH でお使いのメールアドレスを入力します。',
        '<strong>パスワード</strong>に、DI SEARCH のパスワードを入力します。',
        '<strong>接続する</strong>をタップします。認証が終わると「接続済み」に変わります。',
      ],
      img: 'disearch-2-connect.jpg',
      alt: 'DI SEARCH 連携画面。メールアドレスとパスワードの入力欄と「接続する」ボタン',
      caption: '入力した情報は、この端末の中だけに保存されます。',
    },
    {
      title: '「書籍検索」タブで使う',
      items: [
        '画面下部の <strong>書籍検索</strong> タブを開きます。',
        '上部で <strong>書籍</strong>（章単位で探す）と <strong>指導</strong>（引用単位で探す）を切り替えられます。',
        '「幸福について書かれた指導」のように、<strong>ふだんの言葉で入力</strong>して検索します。',
      ],
      img: 'disearch-3-library.jpg',
      alt: '書籍検索タブ。書籍と指導の切り替え、検索欄、検索例が並んでいる',
      caption: 'このタブにも「DI SEARCH に接続」の入口があります。手順 1・2 の代わりに、ここから登録することもできます。',
      after: '検索には少し時間がかかります（指導の検索は 30 秒ほどかかることがあります）。結果が出るまでそのままお待ちください。',
    },
  ],
  faq: [
    {
      q: '御書を読んでいるときにも使えますか？',
      a: '使えます。御書の本文を選択して <strong>AI 現代語訳</strong>を開くと、画面下部に「関連指導」というタブがあります。連携しておくと、選択した御文に関連する池田先生の指導がここに表示されます。連携がまだの場合は「連携の設定へ」ボタンが表示されるので、そこから手順 2 の画面に進めます。<figure><img src="/assets/guide/disearch-4-guidance.jpg" alt="翻訳の解説の関連指導タブ。連携すると関連する指導が読めますという案内と「連携の設定へ」ボタン" loading="lazy" width="1600" height="1200" style="margin-top:12px"></figure>',
    },
    {
      q: 'パスワードは THE GOSHO に送られますか？',
      a: 'いいえ。入力されたメールアドレスとパスワードは、<strong>iOS の Keychain（端末内の暗号化された領域）にのみ保存</strong>され、THE GOSHO のサーバーには送信されません。認証は端末から DI SEARCH のサーバーへ直接行われます。連携を解除すると端末から削除されます。',
    },
    {
      q: '接続できません',
      a: 'まず、同じメールアドレスとパスワードで <a href="https://www.sokadisearch.org/" target="_blank" rel="noopener">DI SEARCH のサイト</a>にログインできるかをお確かめください。サイトにログインできない場合は、DI SEARCH 側でパスワードの再設定が必要です。サイトにはログインできるのにアプリで接続できない場合は、お手数ですが<a href="/support/">サポート</a>までご連絡ください。',
    },
    {
      q: '連携をやめたいときは',
      a: '手順 1 と同じ画面（その他 → 連携 → DI SEARCH）を開くと、接続を解除できます。解除すると、端末に保存された認証情報は削除されます。',
    },
    {
      q: 'DI SEARCH のアカウントがなくても THE GOSHO は使えますか？',
      a: '使えます。御書の閲覧、AI による現代語訳、用語解説、勤行・唱題の記録などは、DI SEARCH との連携がなくてもご利用いただけます。連携が必要なのは「書籍検索」タブと「関連指導」のみです。',
    },
  ],
  related: [
    { href: '/guide/reader/', label: '御書を読む（現代語訳・用語解説）' },
  ],
};
