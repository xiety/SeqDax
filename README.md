# SeqDax
Dynamics AX callstack to sequence diagram converter written in F# and converted to JavaScript using [Fable](https://fable-compiler.github.io/) to play with it online

**Try online:**
https://xiety.github.io/SeqDax/

To create this:

![Sequence diagram](https://xiety.github.io/SeqDax/sample.svg)

From this:

```
[s]    \Data Dictionary\Tables\InventTrans\Methods\update                                                      6
[s]    \Classes\InventUpd_Physical\updatePhysicalIssue                                                       177
[s]    \Classes\InventUpd_Physical\updateNow                                                                  30
[s]    \Classes\InventUpd_Financial\updateNow                                                                 42
[s]    \Classes\InventMov_Journal\journalPostTrans                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postTransLedger                                               46
[s]    \Classes\JournalCheckPostLedger\postVoucher                                                            17
[s]    \Classes\JournalCheckPostLedger\postJournal                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postJournal                                                    6
[s]    \Classes\JournalCheckPost\runPost                                                                       6
[s]    \Classes\JournalCheckPost\run                                                                          37

[s]    \Data Dictionary\Tables\InventTransPosting\Methods\insert                                               3
[s]    \Classes\InventUpdate\updateInventTransPosting                                                         43
[s]    \Classes\InventUpd_Physical\updateNow                                                                  33
[s]    \Classes\InventUpd_Financial\updateNow                                                                 42
[s]    \Classes\InventMov_Journal\journalPostTrans                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postTransLedger                                               46
[s]    \Classes\JournalCheckPostLedger\postVoucher                                                            17
[s]    \Classes\JournalCheckPostLedger\postJournal                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postJournal                                                    6
[s]    \Classes\JournalCheckPost\runPost                                                                       6
[s]    \Classes\JournalCheckPost\run                                                                          37

[s]    \Data Dictionary\Tables\InventTrans\Methods\update                                                      6
[s]    \Classes\InventUpdate\writeInventTrans                                                                 92
[s]    \Classes\InventUpdate\writeInventTransAutoDim                                                         256
[s]    \Classes\InventUpd_Physical\updatePhysicalReceipt                                                      86
[s]    \Classes\InventUpd_Physical\updateNow                                                                  23
[s]    \Classes\InventUpd_Financial\updateNow                                                                 42
[s]    \Classes\InventMov_Journal\journalPostTrans                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postTransLedger                                               67
[s]    \Classes\JournalCheckPostLedger\postVoucher                                                            17
[s]    \Classes\JournalCheckPostLedger\postJournal                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postJournal                                                    6
[s]    \Classes\JournalCheckPost\runPost                                                                       6
[s]    \Classes\JournalCheckPost\run                                                                          37

[s]    \Data Dictionary\Tables\InventTrans\Methods\update                                                      6
[s]    \Classes\InventUpd_Physical\updatePhysicalReceipt                                                      96
[s]    \Classes\InventUpd_Physical\updateNow                                                                  23
[s]    \Classes\InventUpd_Financial\updateNow                                                                 42
[s]    \Classes\InventMov_Journal\journalPostTrans                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postTransLedger                                               67
[s]    \Classes\JournalCheckPostLedger\postVoucher                                                            17
[s]    \Classes\JournalCheckPostLedger\postJournal                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postJournal                                                    6
[s]    \Classes\JournalCheckPost\runPost                                                                       6
[s]    \Classes\JournalCheckPost\run                                                                          37

[s]    \Data Dictionary\Tables\InventTransPosting\Methods\insert                                               3
[s]    \Classes\InventUpdate\updateInventTransPosting                                                         43
[s]    \Classes\InventUpd_Physical\updateNow                                                                  33
[s]    \Classes\InventUpd_Financial\updateNow                                                                 42
[s]    \Classes\InventMov_Journal\journalPostTrans                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postTransLedger                                               67
[s]    \Classes\JournalCheckPostLedger\postVoucher                                                            17
[s]    \Classes\JournalCheckPostLedger\postJournal                                                            25
[s]    \Classes\InventJournalCheckPost_Movement\postJournal                                                    6
[s]    \Classes\JournalCheckPost\runPost                                                                       6
[s]    \Classes\JournalCheckPost\run                                                                          37
```
